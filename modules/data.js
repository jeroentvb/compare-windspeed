const knmi = require('node-knmi-fetch')
const scrape = require('wind-scrape')

async function get () {
  try {
    console.log('Uhu')
    const knmiData = await knmi.hours('all', 'WIND')
    // const harmonie = await scrape.windguru(46940)
  
    const combinedData = {
      ...knmiData
    }
  
    console.log('WHAT?!')
  
    console.log(combinedData)
  
    return combinedData
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  get
}
