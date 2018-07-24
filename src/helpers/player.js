import axios from 'axios'
import Sound from 'react-sound'
import config from '../constants/config'
const play = async (album, reduxProps) => {
  console.log(reduxProps,'as')
  let { data } = await axios(config.baseURL+`album/songs?albumId=${album.id}`)
  reduxProps.setCurrentAlbum(album)
  let song = data.songs[0]
  reduxProps.setCurrentSong(song)    
  reduxProps.setSongs(data.songs)    
  setTitle(song)
  let songUrl = song.fullPath
  songUrl = `${config.baseURL}songs/play?path=${encodeURIComponent(songUrl)}`
  reduxProps.audio.src=songUrl
  reduxProps.audio.play()
  reduxProps.setSongDetails({
      songURL: songUrl,
      playingStatus: Sound.status.PLAYING,
      songIndex: 0,
      songId: song.id,
  })
  reduxProps.setIsPlaying(1)
  
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

const  playPlaylist = async(playlist,reduxProps,isPlaying)=>{
  if(isPlaying) 
    return togglePlay(reduxProps)
  let { data } = await axios(config.baseURL+`playlists/${playlist.id}/songs`)
  console.log(data.songs)
reduxProps.setSongs(data.songs)
let song = data.songs[0]
reduxProps.setCurrentSong(song)    
reduxProps.setCurrentPlaylist(playlist)    
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
}
const togglePlay = (props) => {
  console.log(props,'tog')
  if (props.playingStatus === Sound.status.PLAYING) {
    props.setSongDetails({ playingStatus: Sound.status.PAUSED })
    props.setIsPlaying(0)
  } else {
    props.setSongDetails({ playingStatus: Sound.status.PLAYING})
    props.setIsPlaying(1)
  }
}
export {
  play,setTitle,playPlaylist,togglePlay
}