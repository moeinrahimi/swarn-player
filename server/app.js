
var express = require('express');
var app = express();
var http = require('http').Server(app)
const io = require('socket.io')(http)
module.exports.io = io
const { findSongs } = require('./helpers/song.js')

var cors = require('cors')
const { SongRouter, SettingsRouter, AlbumRouter, RecentlyPlayedRouter, PlaylistRouter, FavoritedRouter } = require('./controllers')
const bodyParser = require('body-parser')
var db = require('./models')
db.sequelize.sync(
  // {force: true}
).catch(err => {
  console.log(`Sequelize issue:\nerr name :${err.name}\nerr message :  ${err.message}`)
});
app.use(cors())
app.set('views', './views')
app.set('view engine', 'jade')
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
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
        
     

io.on('connection', function(socket) {
    console.log('connected')
    socket.on('sync_songs', async (dirId) => {
      console.log('find songs')
        let directory = await db.Directory.findById(dirId)
        findSongs(directory)
    })
});


http.listen(8181,'0.0.0.0', () => console.log('listening !'))