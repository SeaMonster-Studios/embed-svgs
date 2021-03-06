const axios = require('axios')
const createDOMPurify = require('dompurify')
const htmlToJson = require('html-to-json')
const { JSDOM } = require('jsdom')
const SVGO = require('svgo/lib/svgo')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

let els, svgUrlKey, forJSX

function embedSvgs(
  data,
  jsx = false,
  elements = ['icon', 'svg'],
  urlKey = 'url',
) {
  els = elements
  svgUrlKey = urlKey
  forJSX = jsx

  return getAndEmbedSvgs(data)
}

async function getAndEmbedSvgs(data) {
  let embededData

  try {
    if (Array.isArray(data)) {
      embededData = await searchArray(data)
    } else if (typeof data === 'object') {
      embededData = await searchObject(data)
    } else {
      throw new Error('You must provide either an Object or Array to embedSvg.')
    }
  } catch (error) {
    console.error(error)
  }

  return embededData
}

async function searchArray(data) {
  return await Promise.all(
    data.map(async item => {
      if (Array.isArray(item)) {
        item = await searchArray(item)
      } else if (typeof item === 'object') {
        item = await searchObject(item)
      }
      return item
    }),
  )
}

async function searchObject(data) {
  for (let key in data) {
    let property = data[key]
    if (property) {
      if (Array.isArray(property)) {
        data[key] = await searchArray(property)
      } else if (typeof property === 'object' && objectHasEls(key)) {
        data[key] = await getAndEmbedSvg(property)
      } else if (typeof property === 'object') {
        data[key] = await searchObject(property)
      }
    }
  }
  return data
}

function objectHasEls(propertyName) {
  for (let value of els) {
    if (propertyName === value) return true
  }
  return false
}

async function getAndEmbedSvg(obj) {
  try {
    let { data } = await axios.get(obj[svgUrlKey])

    const svgo = new SVGO({
      full: true,
      plugins: [
        { convertShapeToPath: { convertArcs: true } },
        { cleanupAttrs: true },
        { removeXMLNS: true },
        { removeComments: true },
        { removeTitle: true },
        { removeDesc: true },
        { convertTransform: true },
        { removeUselessDefs: true },
        { removeEmptyAttrs: true },
        { removeEmptyText: true },
        { removeEmptyContainers: true },
        { convertPathData: true },
        { cleanupIDs: true },
        { convertStyleToAttrs: true },
      ],
    })

    data = DOMPurify.sanitize(data)
    let { data: optimizedData } = await svgo.optimize(data)
    optimizedData = optimizedData.replace(/"/g, "'")

    obj.svgString = optimizedData
    obj.svgElements = await buildSvgObject(optimizedData)

    return obj
  } catch (error) {
    throw new Error(error)
  }
}

async function buildSvgObject(svgString) {
  const { text } = await htmlToJson.parse(svgString, {
    text: function($doc) {
      let obj = {
        styles: {},
        paths: [],
      }

      // START parse <style></style>
      const styleTag = $doc.find('style')
      if (
        styleTag &&
        styleTag.length &&
        styleTag[0].children &&
        styleTag[0].children.length &&
        styleTag[0].children[0].data
      ) {
        const stylesData = styleTag[0].children[0].data
        const stylesList = stylesData.split('}')

        for (let style of stylesList) {
          const styleChunks = style.split('{')
          if (styleChunks.length && styleChunks[0] !== '') {
            const classNames = styleChunks[0].replace('.', '').replace(' ', '')
            const values = styleChunks[1].split(';')

            classNames.split(',').map(className => {
              if (className) {
                className = className.replace('.', '')

                if (!obj.styles.hasOwnProperty(className)) {
                  obj.styles[className] = []
                }

                for (let value of values) {
                  const parts = value.split(':')
                  if (parts.length && parts[0] !== '') {
                    const styleName = forJSX ? snakeToCamel(parts[0]) : parts[0]
                    const styleValue = parts[1]

                    obj.styles[className].push({
                      [styleName]: styleValue,
                    })
                  }
                }
              }
            })
          }
        }
      }
      // END parse <style></style>

      // put all paths with their attributes in an array
      const els = $doc.find('path')

      let count = 0
      for (let key in els) {
        const el = els[key]

        if (el.name === 'path') {
          let path = {
            id: `svg-element-path-id-${count}`,
          }

          for (let attrName in el.attribs) {
            path.className = el.attribs[attrName]
            // Bind styles to each path that has corresponding class
            if (attrName === 'class') {
              const classNames = el.attribs[attrName].split(' ')

              classNames.map(className => {
                const styles = obj.styles[className]

                if (styles) {
                  styles.map(style => {
                    const propertyName = Object.keys(style)[0]

                    if (propertyName && !path.hasOwnProperty(propertyName)) {
                      path[propertyName] = style[propertyName]
                    }
                  })
                }
              })
            } else {
              path[attrName] = el.attribs[attrName]
            }
          }
          obj.paths.push(path)
        }
        count += 1
      }
      return obj
    },
  })
  return text
}

function snakeToCamel(s) {
  return s.replace(/(\-\w)/g, function(m) {
    return m[1].toUpperCase()
  })
}

module.exports = embedSvgs
