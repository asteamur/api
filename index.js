const express = require('express')
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')
const jwt = require('express-jwt')
const dayjs = require('dayjs')
const { ValidationError } = require('express-json-validator-middleware')
const expressMongoDb = require('express-mongo-db')
//const routes = require('./routes')
const dataSheetRoutes = require('./routes/datasheet')
//const querymen = require('querymen')
//const { middleware: query } = require('querymen')

const app = express()

app.use(expressMongoDb(process.env.DB_URI, {useNewUrlParser: true}))

app.use(bodyParser.json({reviver: function(key, value){
    if(key.endsWith('_date')){
        value._timestamp = dayjs(new Date(value._year, value._month - 1, value._day)).unix()
    }
    return value
}}))
app.use(bodyParser.urlencoded({ extended: true }))
const secret = process.env.SECRET
app.use('/api/auth', jwt({ secret }))

//app.use('/api/auth/food', routes)
app.use('/api/auth/user', dataSheetRoutes)

app.use(function(err, req, res, next) {
    console.log(err)
    if (err instanceof ValidationError) {
      res.status(400).json({error: 'Invalid'})
    }
    else next(err)
})

app.use(function (err, req, res, next) {
    if (err.code === 'credentials_required'){
      res.status(401).json({error: 'Invalid credentials'});
    }
    else if (err.code === 'invalid_token') {
      res.status(401).json({error: 'Invalid token'});
    }
    else if (err.code === 'permission_denied') {
      res.status(403).json({error: 'Forbidden'});
    }
    else {
        res.status(500).json({error: '500'})
    }
})
  
app.use(function (err, req, res, next) {
  if (req.querymen && req.querymen.error) {
    console.log(querymen.error)
    res.status(400).json({error: 'querymen error'})//(req.querymen.error)
  } else {
    next(err)
  }
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})