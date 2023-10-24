const {createSqlConnection} = require('./db');
const express = require('express')

const app = express()
const port = 3000

createSqlConnection();

app.get('/', (req, res) => {
  res.send('Hello yash!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})