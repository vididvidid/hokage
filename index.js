const sequelize = require('./dbWithSequelize');
//const {createSqlConnection} = require('./db');
const express = require('express')

//defining port for express
const app = express()
const port = 3000

//creating connection with mysql database
sequelize;

//available routes
app.use('/api/auth',require('./routes/auth'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})