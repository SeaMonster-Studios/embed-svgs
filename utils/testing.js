let instancesOfObjectDeep = []
let propertyNames

async function getInstancesOfObjectDeep(obj, keys) {
  propertyNames = keys
  if (Array.isArray(obj)) {
    await searchArray(obj)
  } else if (typeof obj === 'object') {
    await searchObject(obj)
  }
  return instancesOfObjectDeep
}

async function searchArray(data) {
  data.map(async item => {
    if (Array.isArray(item)) {
      await searchArray(item)
    } else if (typeof item === 'object') {
      await searchObject(item)
    }
    return item
  })
}

async function searchObject(data) {
  for (let key in data) {
    let property = data[key]
    if (property) {
      if (Array.isArray(property)) {
        await searchArray(property)
      } else if (
        typeof property === 'object' &&
        propertyNames.some(propKey => propKey === key)
      ) {
        instancesOfObjectDeep.push(property)
      } else if (typeof property === 'object') {
        await searchObject(property)
      }
    }
  }
  return data
}

function isCamelCase(str) {
  let strArr = str.split('')
  let string = ''
  for (let i in strArr) {
    if (strArr[i].toUpperCase() === strArr[i]) {
      string += '-' + strArr[i].toLowerCase()
    } else {
      string += strArr[i]
    }
  }

  if (string.toCamelCase(true) === str) {
    return true
  } else {
    return false
  }
}

module.exports = {
  getInstancesOfObjectDeep,
  isCamelCase,
}
