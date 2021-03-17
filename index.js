const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

require('dotenv').config()


const app = express()

app.use(morgan('tiny'))
app.use(cors())



app.get('/videos', (req, res) => {
  res.status(200).json([])
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



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`)
})