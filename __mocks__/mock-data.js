const faker = require('faker')
const _ = require('lodash')

module.exports = {
  ..._.times(faker.random.number(5), () => {
    return {
      [faker.random.word()]: _.times(faker.random.number(5), () => ({
        id: faker.random.uuid(),
        phone: faker.phone.phoneNumber(),
        [faker.random.word()]: faker.random.words(),
        slug: faker.lorem.slug(),
        [faker.random.word()]: faker.lorem.paragraphs(),
        icon: {
          url: faker.internet.url(),
        },
        svg: {
          url: faker.internet.url(),
        },
      })),
    }
  }),
}
