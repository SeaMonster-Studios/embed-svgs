const axios = require('axios')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

class embedSvgs {
  constructor(data, els = ['icon', 'svg'], svgUrlKey = 'url') {
    this.els = els
    this.svgUrlKey = svgUrlKey

    return this.getAndEmbedSvgs(data)
  }
  async getAndEmbedSvgs(data) {
    let embededData

    try {
      if (Array.isArray(data)) {
        embededData = await this.searchArray(data)
      } else if (typeof data === 'object') {
        embededData = await this.searchObject(data)
      } else {
        throw new Error(
          'You must provide either an Object or Array to embedSvg.',
        )
      }
    } catch (error) {
      console.error(error)
    }

    // // USE FOR TESTING OUTPUT
    // const fs = require('fs')
    // fs.writeFile('./output.json', JSON.stringify(embededData), function(err) {
    //   if (err) {
    //     return console.log(err)
    //   }
    // })

    return embededData
  }
  async searchArray(data) {
    return await Promise.all(
      data.map(async item => {
        if (Array.isArray(item)) {
          item = await this.searchArray(item)
        } else if (typeof item === 'object') {
          item = await this.searchObject(item)
        }
        return item
      }),
    )
  }
  async searchObject(data) {
    for (let key in data) {
      let property = data[key]
      if (property) {
        if (Array.isArray(property)) {
          data[key] = await this.searchArray(property)
        } else if (typeof property === 'object' && this.objectHasEls(key)) {
          data[key] = await this.getAndEmbedSvg(property)
        } else if (typeof property === 'object') {
          data[key] = await this.searchObject(property)
        }
      }
    }
    return data
  }
  objectHasEls(propertyName) {
    for (let value of this.els) {
      if (propertyName === value) return true
    }
    return false
  }
  async getAndEmbedSvg(obj) {
    try {
      let { data } = await axios.get(obj[this.svgUrlKey])

      data = DOMPurify.sanitize(data)
        .replace(/"/g, "'")
        .replace(/(\r\n\t|\n|\r\t)/gm, '')

      obj.svg = data

      return obj
    } catch (error) {
      throw new Error(error)
    }
  }
}

module.exports = embedSvgs
