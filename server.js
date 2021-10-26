const app = require('./app')
const path = require('path')
const mongoose = require('mongose')

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))

app.listen()

