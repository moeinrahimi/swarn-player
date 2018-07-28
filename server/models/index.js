const config = require('../config')
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.DBName, config.DBUser, config.DBPass, {
  host: 'localhost',
  dialect: 'mysql',
  charset: 'utf8',
  collate: 'utf8_general_ci',
  timezone: 'Asia/Tehran',
  logging: config.logging

})

var db = {};



db.Song = sequelize.import(__dirname + "/Song")
db.Directory = sequelize.import(__dirname + "/Directory")
db.Album = sequelize.import(__dirname + "/Album")
db.RecentlyPlay = sequelize.import(__dirname + "/RecentlyPlay")
db.PlayList = sequelize.import(__dirname + "/PlayList")
db.PlayListSong = sequelize.import(__dirname + "/PlayListSong")
db.FavoritedSong = sequelize.import(__dirname + "/FavoritedSong")

db.Album.hasMany(db.Song)
db.Song.belongsTo(db.Album,{as:'albumm'})
db.Directory.hasMany(db.Song)
db.Song.belongsTo(db.Directory)
db.RecentlyPlay.belongsTo(db.Song)
db.RecentlyPlay.belongsTo(db.Album)

db.Song.belongsToMany(db.PlayList,{through:db.PlayListSong})
db.PlayList.belongsToMany(db.Song,{through:db.PlayListSong})

db.FavoritedSong.belongsTo(db.Song)
db.Song.hasOne(db.FavoritedSong)


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db