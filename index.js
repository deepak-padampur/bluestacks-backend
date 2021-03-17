const express = require('express')
const mongoose = require('mongoose')
const schedule = require('node-schedule')
const cors = require('cors')
const morgan = require('morgan')
const fetch = require('node-fetch')

require('dotenv').config()


const app = express()

app.use(morgan('tiny'))
app.use(cors())

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

//at recurrent interval schedule a job
//Every minute:''
//Every one hour:'0 * * * *'
//daily

schedule.scheduleJob('fetch-trending-feed', '0 * * * *', () => {
  console.log('Treding video fetched')
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=player&chart=mostPopular&regionCode=IN&maxResults=25&key=${process.env.API_KEY}`

  fetch(url)
    .then(res => res.json())
    .then(videos => {
      console.log(videos)
      // res.status(200).json(videos)
    }).catch(err => {
      console.log(err)
    })

  //cancel the job
  schedule.cancelJob('fetch-trending-feed')
})



app.get('/videos', (req, res) => {

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



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`)
})