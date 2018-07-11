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
  let request = {albumSongs,getAlbum,createHistory,getHistory}
  export default  request