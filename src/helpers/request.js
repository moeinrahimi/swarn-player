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

export {
  albumSongs
}