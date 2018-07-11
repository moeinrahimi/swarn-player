const RecentlyPlayedRouter = require('express').Router()
const db = require('../models')
RecentlyPlayedRouter.get('/',getAlbum)
RecentlyPlayedRouter.post('/',postHistory)

async function getAlbum(req,res){
  let id = req.params.id
    try{
    let histories =  await db.RecentlyPlay.findAll({
      limit:3,
      order : [
        ['id','DESC']
      ],
      include : [
        {model :db.Album}
      ]
    })
    console.log(histories,'aaaaaaaaaaa')
    return res.status(200).json({success: true,message_id: 0,histories:histories})
    }catch(error){
      console.log(error,'histories recently controller')
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}
async function postHistory(req,res){
  let songId = req.body.songId || null
  let albumId = req.body.albumId || null
    try{
    let recentlyPlayed =  await db.RecentlyPlay.create({
      songId : songId , 
      albumId : albumId
    })
    return res.status(200).json({success: true,message_id: 0,recentlyPlayed:recentlyPlayed})
    }catch(error){
      console.log(error,'recentlyPlayed controller')
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}


module.exports = RecentlyPlayedRouter