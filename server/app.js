
var express = require('express');
var app = express();
var http = require('http').Server(app)
const io = require('socket.io')(http)


const { SongRouter, SettingsRouter, AlbumRouter, RecentlyPlayedRouter, PlaylistRouter, FavoritedRouter } = require('./controllers')
const bodyParser = require('body-parser')
var db = require('./models')

db.sequelize.sync(
  // {force: true}
).catch(err => {
  console.log(`Sequelize issue:\nerr name :${err.name}\nerr message :  ${err.message}`)
});
app.set('views', './views')
app.set('view engine', 'jade')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();


});
app.get('/io',(req,res)=>{
    res.render('index')
})
app.use('/', SongRouter)
app.use('/albums', AlbumRouter)
app.use('/settings', SettingsRouter)
app.use('/histories', RecentlyPlayedRouter)
app.use('/playlists', PlaylistRouter)
app.use('/favorites', FavoritedRouter)
app.use(express.static('public'))
        
     
const { findSongs } = require('./helpers/song.js')
io.on('connection', function(socket) {
    console.log('connected')
    socket.on('sync_songs', async (dirId) => {
      console.log('connected22222')
        let directory = await db.Directory.findById(dirId)
        findSongs(directory)
    })
});


http.listen(8181,'0.0.0.0', () => console.log('listening !'))

module.exports.io = io