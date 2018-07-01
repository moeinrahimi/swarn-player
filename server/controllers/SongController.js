const path = require('path')
const fs =require('fs')
const nanoid = require('nanoid')
const {  getDirFiles , getArtwork , getMusicMeta,findSongs} = require('../helpers/song')
const SongRouter = require('express').Router()
const redis = require("redis"),
client = redis.createClient();
const db = require('../models')
SongRouter.get('/',getAlbums)
SongRouter.post('/songs/index',indexSongs)
SongRouter.get('/songs/play',streamSong)
SongRouter.get('/songs/recently',recentlyAddedAlbums)
SongRouter.get('/album/songs',getAlbumSongs)

async function getAlbumSongs(req,res){
  let albumId = req.query.albumId
    try{
    let songs =  await db.Song.findAll({where : {albummId:albumId}})
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

async function recentlyAddedAlbums(req,res){
  let oneDayBefore = new Date()
  oneDayBefore.setDate(oneDayBefore.getDate()-2);
  try{
    let albums = await db.Album.all({where : {
      createdAt : {$gte:oneDayBefore}
    }}) 
    return res.status(200).json({success: true,message_id: 0,albums})
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
function compare(a,b) {
  if (a.album < b.album)
    return -1;
  if (a.album > b.album)
    return 1;
  return 0;
}
async function indexSongs(req,res){
  let directoryId = req.body.directoryId
    try{
      let directory = await db.Directory.findById(directoryId)
      let songs = await findSongs(directory)  
      return res.status(200).json({success: true,message_id: 0,message:'songs indexed'})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}
async function getAlbums(req,res){
  try{
    let allSongs = []
      try{
          let albums = await db.Album.all()
          return res.status(200).json({success:true,message_id:0,folders : albums  })   
      }catch(e){
        console.log(e)
      }
  }catch(e){
    console.log(e,'getAlbums func')
    return res.status(400).json({success:false,message_id:1,message:e })
}
    
  
}

module.exports = SongRouter