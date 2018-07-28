const SongRouter = require('./SongController')
const SettingsRouter = require('./SettingsController')
const AlbumRouter = require('./AlbumController')
const RecentlyPlayedRouter = require('./RecentlyPlayedController')
const PlaylistRouter = require('./PlaylistController')
const FavoritedRouter = require('./FavoritedSongsController')

module.exports = {
  SongRouter,SettingsRouter,AlbumRouter,PlaylistRouter,RecentlyPlayedRouter,FavoritedRouter
}