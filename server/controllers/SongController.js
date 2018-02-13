
const metaData = require('musicmetadata');
const axios = require('axios')
const path = require('path')
const fs =require('fs')
const nanoid = require('nanoid')
const {  getConfig , getDirFiles , getArtwork , getMusicMeta,findSongs} = require('../helpers/song')
const SongRouter = require('express').Router()
const redis = require("redis"),
client = redis.createClient();
SongRouter.get('/',getMusics)
SongRouter.get('/songs/play',streamSong)
SongRouter.get('/songs/list',getSelectedPathSongs)
function getKey(key){
  return new Promise((resolve,reject)=>{
    client.get(key, function(err, reply) {
      // reply is null when the key is missing
      if(err)reject(err)
      resolve(reply)
  });
  })
}
async function getSelectedPathSongs(req,res){
  let dir = req.query.dir
    try{
      let songs =  await getSongNames(dir)
    return res.status(200).json({success: true,message_id: 0,songs:songs})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}
function streamSong(req,res){
  let song = req.query.path  
  try{
    let stream = fs.createReadStream(song)
    console.log(stream,song)
    stream.pipe(res)
  // return res.status(200).json({success: true,message_id: 0,message: ''})
  }catch(error){
    console.log(error)
    return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
  }
  
}
const getSongNames = async(dir) => {
  let songs = fs.readdirSync(dir,{encoding:'utf8'})
  let songsCount = songs.length
  let songsPath = []
  for(let i = 0;i<songsCount;i++){
    try{
      let song = songs[i]
      let fullPath = path.resolve(dir,song)
      console.log(fullPath)
      let isFile = fs.lstatSync(fullPath).isFile()
      if(!isFile){
        continue
      }
      let meta = await getMusicMeta(fullPath)
      meta.song = fullPath
      delete meta.picture
      meta.id = nanoid()
      songsPath.push(meta)
    }catch(e){
      console.log(e,'in getSongsNames function')
    }
    

  }
  return songsPath
}

 async function getMusics(req,res){

  try{
    let songs 
  let config = JSON.parse(getConfig())
  let pathCount= config.dirs.length
    for(let i = 0;i<pathCount;i++){
      try{
        let baseDir = config.dirs[i]
        let isThereSongs = await  getKey(baseDir)
        console.log(isThereSongs,baseDir)
        if(isThereSongs){
          console.log('yeah there is songs')
          songs = JSON.parse(isThereSongs)
          continue
        }
        songs = await findSongs(baseDir)
        client.set(baseDir, JSON.stringify(songs));
      }catch(e){
        console.log(e)
      }
        
}
return res.status(200).json({success:true,message_id:0,folders : songs[0],albums:songs[1] })
}catch(e){
  console.log(e,'getMusics func')
  return res.status(400).json({success:false,message_id:1,message:e })
}
    
  
}

module.exports = SongRouter