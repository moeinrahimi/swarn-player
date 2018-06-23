const path = require('path')
const fs =require('fs')
const {    getDirFiles , getArtwork , getMusicMeta,findSongs} = require('../helpers/song')
const SettingsRouter = require('express').Router()
const db = require('../models')
const redis = require('../helpers/redis')
// let configPath = path.resolve(__dirname,'../config.json')
SettingsRouter.post('/',saveDir)
SettingsRouter.get('/',getDirs)
SettingsRouter.delete('/:id',deleteDir)
async function saveDir(req,res,next){
  let dir = req.body.newDir
    try{
      let newDir = await await db.Directory.findOrCreate({
        where : {
          path : dir 
        }
      })

      if(newDir[1] == false){
        return res.status(400).json({success:false,message_id:3,message:'directory already exists' })
      }
      return res.status(200).json({success: true,message_id: 0,message: 'new directory added successfully',newDir:newDir[0]})
    }catch(error){
      console.log(error)
      if(error.code == 'ENOENT'){
        return res.status(400).json({success:false,message_id:4,message:'not a valid directory' })
      }
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
}
async function getDirs(req,res){
  try{
     let directories = await db.Directory.all()
    return res.status(200).json({success:true,message_id:0,settings:directories })
  }catch(e){
    console.log(e)
    return res.status(name).json({success:status,message_id:0,message:'something bad happened' })
  }
}
async function deleteDir(req,res,next){
  let id = req.params.id 
    try{
      let directory = await db.Directory.findById(id)
      console.log(directory.path,'------')

      
      // await redis.remove(directory.path)
      await db.Song.destroy({where:{
        directoryId : directory.id 
      }
    })
    await db.Directory.destroy({
      where : {
        id : id 
      }
    })
    return res.status(200).json({success: true,message_id: 0,message: 'directory deleted successfully'})
    }catch(error){
      console.log(error)
      return res.status(504).json({success: false,message_id: 1,message: 'something bad happened'})
    }
}
module.exports = SettingsRouter