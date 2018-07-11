import axios from 'axios'
import Sound from 'react-sound'

import config from '../constants/config'
const play = async (album, reduxProps) => {
  console.log(reduxProps,'as')
  let { data } = await axios(config.baseURL+`album/songs?albumId=${album.id}`)
  // this.props.setAlbum(album)
  // this.props.setSongs(data.songs)
  reduxProps.setCurrentAlbum(album)
  // reduxProps.setCurrentSongs(data.songs)
  let song = data.songs[0]
  reduxProps.setCurrentSong(song)    
  setTitle(song)
  let songUrl = song.fullPath
  songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
  reduxProps.setSongDetails({

      songURL: songUrl,
      playingStatus: Sound.status.PLAYING,
      songIndex: 0,
      songId: song.id,
    
  })
  reduxProps.setIsPlaying(1)

  

  console.log(this.props,'------------------')
}
const setTitle = (song) => {
  // console.log(song,'aaaaaaaaa')
  let artist 
  if(Array.isArray(song.artist)){
    artist = song.artist[0]
  }else{
    artist = song.artist
  }
  // console.log(song)
  document.title = `${song.title || 'Unknown'} - ${artist || 'Unknown'}`
}
export {
  play,setTitle
}