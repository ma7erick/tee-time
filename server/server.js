const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
require('dotenv').config({ path: './config.env' })
const port = process.env.PORT || 5001
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(require('./routes/facilities'))
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'))
})

// get driver connection
const dbo = require('./db/conn')

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err)
  })
  console.log(`Server is running on port: ${port}`)
})
