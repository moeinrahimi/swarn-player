const AlbumRouter = require('express').Router()
const db = require('../models')
AlbumRouter.get('/:id',getAlbum)

async function getAlbum(req,res){
  let id = req.params.id
    try{
    let album =  await db.Album.findById(id)
    return res.status(200).json({success: true,message_id: 0,album:album})
    }catch(error){
      console.log(error,'getAlbum album controller')
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}


module.exports = AlbumRouter