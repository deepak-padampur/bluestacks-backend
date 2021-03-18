const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const trendingFeed = require('./models/videoModel')
const schedule = require('node-schedule')
const _ = require('lodash')
const cors = require('cors')
const morgan = require('morgan')
const fetch = require('node-fetch')

require('dotenv').config()


const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(compression())

const DB = process.env.DB_URI

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(conn => {
  console.log('database connected successfully')
}).catch(err => {
  console.log(err)
})

const trending = mongoose.model('trending', trendingFeed)

schedule.scheduleJob('fetch-trending-feed', '0 * * * *', () => {

  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=player&chart=mostPopular&regionCode=IN&maxResults=25&key=${process.env.API_KEY}`
  fetch(url)
    .then(res => res.json())
    .then(videos => {
      trending.create(videos).then(doc => {
        console.log('data added successfully')
      }).catch(err => {
        console.log(err)
      })

    }).catch(err => {
      console.log(err)
    })
})

app.get('/', (req, res) => {
  res.status(200).json({
    status: "Success",
    message: 'Server is up an running'
  })
})




app.get('/api/v1/videos', (req, res) => {

  trending
    .find()
    .sort({ $natural: -1 })
    .limit(1)
    .then(doc => {
      res.status(200).json(doc)
    }).catch(err => {
      res.json({ err })
    })


})

app.get('/api/v1/videos/:id', (req, res) => {
  if (req.params.id) {
    trending.find({
      "items._id": req.params.id
    }, { 'items.$': 1 }).then(doc => {
      res.status(200).json(doc)
    }).catch(err => {
      res.json(err)
    })
  } else {
    res.json({
      message: "query params not defined"
    })
  }

})



const notFound = (req, res, next) => {
  res.status(404)
  const error = new Error('Not Found')
  next(error)

}

const errorHandler = (error, req, res, next) => {
  res.status(res.statusCode || 500)
  res.json({
    message: error.message
  })
}

app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`)
})