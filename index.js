const express = require('express')
const bodyParser = require('body-parser')
const asyncHandler = require('express-async-handler')
const jwt = require('express-jwt')
const guard = require('express-jwt-permissions')()
const dayjs = require('dayjs')
const { Validator, ValidationError } = require('express-json-validator-middleware')
const expressMongoDb = require('express-mongo-db')
const routes = require('./routes')

//const querymen = require('querymen')
//const { middleware: query } = require('querymen')

var validator = new Validator({allErrors: true, coerceTypes: true })

/*
function getSchema(req) {
  return req.schema
}

const schema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: {
      type: 'number'
    }
  }
}

function loadSchema(req, res, next) {
  req.schema = schema
  next()
}
*/

const app = express()

app.use(expressMongoDb(process.env.DB_URI))

app.use(bodyParser.json({reviver: function(key, value){
    if(key.endsWith('_date')){
        value._timestamp = dayjs(new Date(value._year, value._month, value._day)).unix()
    }
    return value
}}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth/*', jwt({ secret: 'secret'}))



function ok(res, body){
  res.status(200).json(body)
}

app.get('/api/test', asyncHandler(async function(req, res){
    ok(res, {a: 1})    
}))

app.use('/api/auth/food', routes)

/*
app.post('/api/auth/food/:name', validator.validate({body: {
    type: 'object',
    properties: {
        a: {
            type: "number"
        }
    }
}}), guard.check(['food:write']), asyncHandler(async function(req, res) {
    const resp = await req.db.collection('test0').insertOne(req.body)
    created(res, resp.insertedId) 
}))
*/

/*
app.get('/api/auth/user/:id/*', loadSchema, 
                            validator.validate({params: getSchema}), 
                            guard.check(['user:read']),
function(req, res, next) {
  console.log(req.params)
  if(req.user.role === 'test'){
    if(req.user.ids.includes(req.params.id)){
      next()
    } else {
      next(new Error('id not in list'))
    }
  } else {
    next()
  }
})
*/

app.use(function(err, req, res, next) {
    console.log(err)
    if (err instanceof ValidationError) {
      res.status(400).json({error: 'Invalid'})
    }
    else next(err)
})

app.use(function (err, req, res, next) {
    if (err.code === 'invalid_token') {
        res.status(401).json({error: 'Invalid token'});
    }
    else if (err.code === 'permission_denied') {
        res.status(403).json({error: 'Forbidden'});
    }
    else {
        console.log(err)
        res.status(500).json({error: '500'})
    }
})
  
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})