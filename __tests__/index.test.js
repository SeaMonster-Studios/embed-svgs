//
const { getInstancesOfObjectDeep } = require('../utils/testing')
const mockData = require('../__mocks__/mock-data')
const embedSvgs = require('../index')

const faker = require('faker')

let results

beforeEach(async () => {
  results = await embedSvgs(mockData)
})

it('Expects svgString and svgElement properties with values within each object that has an `icon` or `svg` property/nested object', async () => {
  const instances = await getInstancesOfObjectDeep(results, ['icon', 'svg'])

  expect(instances.length).toBeGreaterThan(0)

  instances.map(instance => {
    expect(instance.hasOwnProperty('svgString')).toBe(true)
    expect(instance.hasOwnProperty('svgElements')).toBe(true)
    expect(instance.svgElements.hasOwnProperty('styles'))
    expect(instance.svgElements.hasOwnProperty('paths'))
  })
})

it('Expects the paths array to have items, and that each item has a `d` property', async () => {
  const instances = await getInstancesOfObjectDeep(results, ['icon', 'svg'])

  instances.map(instance => {
    expect(instance.svgElements.paths.length).toBeGreaterThan(0)
    expect(
      instance.svgElements.paths.every(path => path.hasOwnProperty('d')),
    ).toBe(true)
  })
})

it('Expects each path with a classes, where each class has styles, to have those styles as properties on that same path', async () => {
  const instances = await getInstancesOfObjectDeep(results, ['icon', 'svg'])

  instances.map(instance => {
    instance.svgElements.paths.map(path => {
      if (path.hasOwnProperty('class')) {
        const classes = path.class.split(' ')

        classes.map(className => {
          const styles = instance.svgElements.styles[className]
          for (let key in styles) {
            const styleName = Object.keys(styles[key])[0]
            const styleValue = styles[key][styleName]

            expect(path[styleName]).toBe(styleValue)
          }
        })
      }
    })
  })
})
