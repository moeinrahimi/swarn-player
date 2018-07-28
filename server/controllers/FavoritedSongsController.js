const FavoritedRouter = require('express').Router()
const db = require('../models')
FavoritedRouter.get('/',favoritedSongs)
FavoritedRouter.post('/',createFavoritedSongs)
FavoritedRouter.delete('/:id',deleteFavoritedSongs)


async function favoritedSongs(req,res){
  try{
  let songs =  await db.Song.findAll({
    include : [
      {model:db.FavoritedSong,required:true}
    ]
  })
  return res.status(200).json({success: true,message_id: 0,favorites:songs})
  }catch(error){
    console.log(error,'favoritedSongs FavoritedRouter controller')
    return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
  }
}

async function createFavoritedSongs(req,res){
  let songId = req.body.songId 
  try{
    let songs =  await db.FavoritedSong.findOrCreate({
      where:{
        songId : songId 
      }
    })
    let song = songs[0]
    if(songs[1] == true){
      return res.status(200).json({success: true,message_id: 0,song:song})
    }
    return res.status(200).json({success: true,message_id: 0,message : 'song is already in favorited songs'})
  }catch(error){
    console.log(error,'favoritedSongs FavoritedRouter controller')
    return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
  }
}

async function deleteFavoritedSongs(req,res){
  let favoritedId = req.params.id 
  try{
    let songs =  await db.FavoritedSong.destroy({
      where:{
        id:favoritedId
      }
    })
    return res.status(200).json({success: true,message_id: 0,message:'favorited song deleted successfully'})
  }catch(error){
    console.log(error,'favoritedSongs FavoritedRouter controller')
    return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
  }
}



module.exports = FavoritedRouter