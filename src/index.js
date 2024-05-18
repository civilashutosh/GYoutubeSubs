const express = require('express')
const appi = require('./app.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const app= express()
const mongoose = require('mongoose')
//const cors= require("cors")

const port = 3000

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(appi);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//app.use(cors())


 //Connect to DATABASE
const DATABASE_URL = "mongodb://127.0.0.1/subscribers";
mongoose.connect(DATABASE_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))

// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
