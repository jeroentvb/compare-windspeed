const path = require('path')
const app = require('express')

const data = require('./modules/data')
const knmi = require('node-knmi-fetch')
const scrape = require('wind-scrape')

app()
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views/pages'))
  .use(app.static('public'))
  // .use(bodyParser.urlencoded({
  //   extended: true
  // }))

  .get('/', index)
  .get('/spot/:id', spot)
  // .get('/data/:spot', spotData)

  .use(notFound)
  .listen(process.env.PORT || 3000, () => console.log(`[server] listening on port ${process.env.PORT || 3000}`))

async function index (req, res) {
  try {
    const knmiData = await knmi.hours(249, 'WIND', {
      start: '2020030111',
      end: '2020030811'
    })
    const harmonie = await scrape.windguru(46940)
    res.render('index', {
      data: {
        knmi: knmiData,
        harmonie
      }
    })
  } catch (err) {
    console.error(err)
  }
}

function spot (req, res) {
  res.render('spot')
}

async function spotData (req, res) {
  try {
    console.log('TRYING SOOOO HAAAAARRRRDDD')
    const info = await data.get(req.params.spot)
    console.log(info)
    res.json(info)
  } catch (err) {
    console.error(err)
    res.json({
      error: 'Something went wrong'
    })
  }
}

function notFound (req, res) {
  res.status(404).render('error', {
    error: {
      status: 404,
      message: 'The page was not found.'
    }
  })
}
