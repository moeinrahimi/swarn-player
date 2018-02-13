
const express = require('express')
const app = express()
const {SongRouter,SettingsRouter} = require('./controllers')
const bodyParser = require('body-parser')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");  next();
});
app.use('/',SongRouter)
app.use('/settings',SettingsRouter)
app.use(express.static('public'))

app.listen(8181)
