const mockData = require('../__mocks__/mock-data')
const embedSvgs = require('../index')
const getAndEmbedSvgs = embedSvgs.__get__('getAndEmbedSvgs')

let results

beforeEach(async () => {
  results = await new embedSvgs(mockData)
})

it('Expects getAndEmbedSvgs to have been called with the data provided.', () => {
  const spy = jest.spyOn(getAndEmbedSvgs)
  expect(spy).toHaveBeenCalledWith(mockData)
})
