const { ObjectID } = require('mongodb');
const {Router} = require('express')
const asyncHandler = require('express-async-handler')
const guard = require('express-jwt-permissions')()
const { Validator } = require('express-json-validator-middleware')
const { patched } = require('./utils')
const { datasheetSchema } = require('../schemas/datasheet')

const validator = new Validator({allErrors: true, coerceTypes: true })

const router = Router()

router.patch('/datasheet/:_id', validator.validate(
{
params: {
    type: 'object',
    properties: {
        _id: {
            type: 'string'
        }
    },
    required: ['_id'] 
},
body: datasheetSchema
}), guard.check(['user/datasheet:write']), asyncHandler(async function(req, res) {
    const resp = await req.db.collection('users').updateOne({_id: new ObjectID(req.params._id)}, {$set: {datasheet: req.body}})
    patched(res) 
}))

module.exports = router;