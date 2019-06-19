const jwt = require('jsonwebtoken')
const token = jwt.sign({ role: 'test', permissions: ['user/datasheet:write'] }, 'secret')

console.log(token)