const config = require('../config.json')
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.DBName, config.DBUser, config.DBPass, {
  host: 'localhost',
  dialect: 'mysql',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timezone: 'Asia/Tehran',
  // logging: config.logging

})

var db = {};



db.Song = sequelize.import(__dirname + "/Song")
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db