const jwt = require('jsonwebtoken')
const token = jwt.sign({ role: 'test', permissions: ['food:read', 'food:write'] }, 'secret')

console.log(token)