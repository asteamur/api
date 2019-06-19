const express = require('express')
const asyncHandler = require('express-async-handler')
const guard = require('express-jwt-permissions')()
const { Validator, ValidationError } = require('express-json-validator-middleware')

function created(res, location){
    res.status(201).set('Location', location).end()
}

const validator = new Validator({allErrors: true, coerceTypes: true })

const router = express.Router()

router.post('/type/:name', validator.validate(
{
params: {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        }
    },
    required: ['name'] 
},body: {
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

module.exports = router;