import config from '../../constants/config'
const axios = require('axios')


const searchEverything = async(query)=>{
  try{
    let { data } = await axios(config.baseURL+`albums/search?query=${query}`)
    return data 
  }catch(e){
    console.log(e,'searchEverything func')
  }
}

  export default{searchEverything}