const axios = require('axios')
const stringReplaceAsync = require('string-replace-async')

async function embedSvgs(data, el = 'icon', urlKey = 'url') {
  let dataString = JSON.stringify(data)
  let updatedData
  const pattern = `"${el}":{"${urlKey}":"(.*?)"}`
  const re = new RegExp(pattern, 'g')

  dataString = await stringReplaceAsync(
    dataString,
    re,
    async (match, capture) => await getSvgContents(match, capture, el, urlKey),
  )

  // // USE FOR TESTING OUTPUT
  // var fs = require('fs')
  // fs.writeFile('./output.json', dataString, function(err) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log('The file was saved!')
  // })

  try {
    updatedData = JSON.parse(dataString)
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(
      '\nError parsing JSON data after embedding SVG content.\nUsing original data, without SVG embeded content.\n',
      error,
    )
    updatedData = data
  }

  return updatedData
}

const getSvgContents = async (match, url, el, urlKey) => {
  try {
    let { data } = await axios.get(url)
    let replacement

    // Replace " with ', because it'll be in JSON and will need the entire svg code to be wrapped in "". Remove whitespace, or it'll break the JSON. Rmove xml and comments.
    data = data
      .replace(/<\?xml.*?>/, '')
      .replace(/<!--.*-->/, '')
      .replace(/"/g, "'")
      .trim()

    const svgPattern = new RegExp('<svg.*?</svg>')

    if (svgPattern.test(data)) {
      replacement = `"${el}": {
        "${urlKey}": "${url}",
        "svg": "${data}"
      }`
    } else {
      replacement = match
    }
    return replacement
  } catch (error) {
    return match
  }
}

module.exports = embedSvgs
