import request from './request'
import { toast } from 'react-toastify';

const addSongToFavorites = async (song,redux)=>{
  if(Object.keys(song).length == 0)
    return 
  try{
    console.log(song)
    let result = await request.createFavoritedSongs(song.id)
    song = await request.getSong(song.id)
    redux.setCurrentSong(song.song)
    toast.success('song added to playlist successfully')
    
  }catch(e){
    console.log(e)
  }
  
}

const removeFavoritesSong = async (song,redux)=>{
  try{
    let result = await request.deleteFavoritedSongs(song.favoritedSong.id)
    song = await request.getSong(song.id)
    redux.setCurrentSong(song.song)
    toast.success('song removed from your library successfully')
  }catch(e){
    console.log(e)
  }
  
}


export default {
  addSongToFavorites,removeFavoritesSong
}