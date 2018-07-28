import config from '../constants/config'
const axios = require('axios')


const albumSongs = async(id)=>{
  try{
    console.log(config.baseURL)
    let { data } = await axios(config.baseURL+`album/songs?albumId=${id}`)
    return data 
  }catch(e){
    console.log(e,'albumSongs func')
  }
}
const getAlbum = async(id)=>{
  try{
    let { data } = await axios(config.baseURL+`albums/${id}`)
    return data 
  }catch(e){
    console.log(e,'getAlbum func')
  }
}
const createHistory = async(songId,albumId)=>{
  try{
    let { data } = await axios.post(config.baseURL+`histories`,{songId, albumId})
    return data 
  }catch(e){
    console.log(e,'createHistory func')
  }
}
const getHistory = async()=>{
  try{
    let { data } = await axios(config.baseURL+`histories`)
    return data 
  }catch(e){
    console.log(e,'createHistory func')
  }
}
const favoritedSongs = async()=>{
  try{
    let { data } = await axios(config.baseURL+`favorites`)
    return data 
  }catch(e){
    console.log(e,'favoritedSongs func')
  }
}
const createFavoritedSongs = async(songId)=>{
  try{
    let body  = {
      songId:songId
    }
    let { data } = await axios.post(config.baseURL+`favorites`,body)
    return data 
  }catch(e){
    console.log(e,'createFavoritedSongs func')
  }
}
const deleteFavoritedSongs = async(favId)=>{
  try{
    let { data } = await axios.delete(config.baseURL+`favorites/${favId}`)
    return data 
  }catch(e){
    console.log(e,'deleteFavoritedSongs func')
  }
}

const getSong = async(id)=>{
  try{
    let { data } = await axios(config.baseURL+`songs/${id}`)
    return data 
  }catch(e){
    console.log(e,'getsong func')
  }
}
  let request = {albumSongs,getAlbum,createHistory,getHistory,deleteFavoritedSongs,createFavoritedSongs,favoritedSongs,getSong}
  export default  request