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

export {
  albumSongs,getAlbum
}