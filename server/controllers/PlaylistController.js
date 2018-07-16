const PlaylistRouter = require('express').Router()
const db = require('../models')
PlaylistRouter.get('/',getPlaylists)
PlaylistRouter.post('/',postPlaylist)
PlaylistRouter.get('/:id',getPlaylist)
PlaylistRouter.post('/:id',addSongToPlaylist)
PlaylistRouter.post('/:id',addSongToPlaylist)
PlaylistRouter.get('/:id/songs',getPlaylistSongs)

async function getPlaylists(req,res){
    try{
    let playlists =  await db.PlayList.findAll({
      order : [
        ['id','DESC']
      ],
      include : [
        {model :db.Song,through:{model:db.PlayListSong,attributes:[]},include:[
          {model :db.Album,as:'albumm'}
        ]}
      ]
    })
    // console.log(playlists,'aaaaaaaaaaa')
    return res.status(200).json({success: true,message_id: 0,playlists:playlists})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}
async function getPlaylist(req,res){
  let id = req.params.id
    try{
    let playlist =  await db.PlayList.findById(id)
    let playlistSongs =  await db.PlayList.findById(id,{   include : [
      {model :db.Song,through:{model:db.PlayListSong,attributes:[]},include:[
        {model :db.Album,as:'albumm'}
      ]}
    ]})
    // console.log(playlists,'aaaaaaaaaaa')
    return res.status(200).json({success: true,message_id: 0,playlist:playlist,songs:playlistSongs.songs})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}
async function getPlaylistSongs(req,res){
  let id = req.params.id 
    try{
    let playlistSongs =  await db.PlayList.findById(id,{
      include : [
        {model :db.Song,through:{model:db.PlayListSong,attributes:[]},include:[
          {model :db.Album,as:'albumm'}
        ]}
      ]
    })
    // console.log(playlists,'aaaaaaaaaaa')
    return res.status(200).json({success: true,message_id: 0,songs : playlistSongs.songs })
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}
async function postPlaylist(req,res){
  let songId = req.body.name 
    try{
    let playlist =  await db.RecentlyPlay.create({
      name : name 
    })
    return res.status(200).json({success: true,message_id: 0,playlist:playlist})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}
async function addSongToPlaylist(req,res){
  let songId = req.body.songId 
  let playlistId = req.params.id
    try{

    let playlist =  await db.PlayListSong.create({
      songId : songId , 
      playlistId : playlistId
    })
    return res.status(200).json({success: true,message_id: 0,playlist:playlist})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
  
}


module.exports = PlaylistRouter