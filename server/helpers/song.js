const metaData = require('musicmetadata');
const axios = require('axios')
const path = require('path')
const fs =require('fs')
const Vibrant = require('node-vibrant')
const nanoid = require('nanoid')
const {cleanFileName} = require('./file')
const db =require('../models')
const getMusicMeta = (file) => {
  return new Promise((resolve,reject)=>{
    let stream = fs.createReadStream(file)
    metaData(stream,(err,meta)=>{
      if(err) {
        // console.log(file,'get music data err')
        reject('could not find metadata header')
      }
      stream.close();
      resolve(meta)
  })
})
}
       
const getArtwork = (name) => {
  console.log('geta',name)
  return new Promise((resolve, reject)=>{
    const url = `https://itunes.apple.com/search?term=${name}&limit=1&media=music`
    // console.log(url)
    axios.get(url)
    .then(res=>{
      console.log(res.data , 'itunesssss')
      let artwork 
      if( res.data.results[0] ){
        artwork = res.data.results[0].artworkUrl100.replace('100x100','600x300')
        resolve(artwork)
      }
      resolve(null)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

const getDirFiles = (dir) =>{
  return new Promise((resolve,reject)=>{
    fs.readdir(dir,{encoding:'utf8'},(err,files)=>{
      if(err)  reject(err)

      resolve(files)
    })

  })
  
}
const getConfig = () => {
  let configPath = path.resolve(__dirname,'../config.json')
  let config = fs.readFileSync(configPath,{encoding:'utf8'})
  return config
 }
 function search(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
          return myArray[i];
      }
  }
}

var findSongs = async function (baseDir,musics)  {
   musics = musics ||  []
  try{
    var files = await getDirFiles(baseDir)
    for(let i =0;i<files.length;i++){
      try {
        let file = files[i]
        var musicPath = `${baseDir}/${file}`
        // console.log(musicPath)
        // continue
        let stat = fs.lstatSync(musicPath)    
        if(stat.isDirectory()){
          console.log(musicPath,'isDir')
          await findSongs(musicPath,musics)
        }else{ 
          // console.log(musicPath,'------')
        let meta = await getMusicMeta(musicPath)
        if(meta){
        //   meta.music = musicPath
          delete meta.picture
          meta.fullPath = musicPath
          meta.id = nanoid()
          let dirName = path.basename(path.dirname(musicPath))    
          let songName = meta.title || meta.album
          csongName = cleanFileName(songName)
          
          
            let image =  csongName+'.jpg'
            let artowrkAbsolutePath ='./public/'+image 
            let hasArtwork = fs.existsSync(artowrkAbsolutePath)
            meta.artwork = hasArtwork ? image : 'default.jpg' 
            let color = await  Vibrant.from(hasArtwork ? artowrkAbsolutePath : './public/default.jpg' ).getPalette()
            meta.color = color       
            meta.dirName = dirName
            meta.baseDir = baseDir
            meta.dir = baseDir
            musics.push(meta)
            saveSong(meta,baseDir)
            .then(savedSong=>{
              if(hasArtwork){
                db.Song.update({
                  artwork : image 
                },{
                  where : {
                    id : savedSong[0].id 
                  }
                })
              }else {
                 getArtwork(songName).then(artwork=>{
                // console.log(artwork,'slmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')   
                  if(artwork){
                     saveArtwork(artwork,artowrkAbsolutePath).then(saveImage =>{
                      // console.log(saveImage,'-----------')
                      db.Song.update({
                        artwork : image 
                      },{
                        where : {
                          id : savedSong[0].id 
                        }
                      })
                     })
                  }
                 }).catch(e=>{
                   console.log(e,'got error getArtwork')
                 })
               
              }
            })
           
           
         
        }


    }
}catch(e){
    console.log(e,'find songs function')  
}

  }  
  return musics
}catch(e){
  console.log(e,'hhhh')
  throw e
}
 }

 const saveArtwork= async (url,path) => {
   try{
     console.log(url,'aaaa')
    let {data} = await axios.get(url, {
      responseType: 'arraybuffer' 
  })
    // console.log(data,'---------')
    
    fs.writeFileSync(path,data)
    return true
   }catch(e){
     console.log(e,'eeeeeeeeeeeeeeeeeeeeee')
   }
  
  // console.log(artworkBuffer)
 }

 const saveSong = (meta,baseDir) =>{
  return db.Song.findOrCreate({
    where : {
      path : meta.fullPath
    },
    defaults : {
      name :meta.title,
      album :meta.album,
      // artwork :meta.name,
      // fileName :meta.name,
      genre :meta.genre.toString(),
      artist :meta.artist.toString(),
      year :meta.year,
      // color :meta.name,
      dirName :meta.dirName,
      baseDir :baseDir,
    }
  })

 }

 module.exports = {
   getConfig , getDirFiles , getArtwork , getMusicMeta , findSongs
 }