const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo()
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/', (req, res) => {
  res.send('hii')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook Backend listening at http://localhost:${port}`)
})
