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

var findSongs = async function (directory,musics)  {
   musics = musics ||  []
   let baseDir = directory.path
   console.log(baseDir,'aaaaaaaaaaaaaaaaaa')
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
          await findSongs({id:directory.id , path:musicPath},musics)
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
          // csongName = cleanFileName(songName)
          
          
          //   let image =  csongName+'.jpg'
          //   let artowrkAbsolutePath ='./public/'+image 
          //   let hasArtwork = fs.existsSync(artowrkAbsolutePath)
          //   meta.artwork = hasArtwork ? image : 'default.jpg' 
          //   let color = await  Vibrant.from(hasArtwork ? artowrkAbsolutePath : './public/default.jpg' ).getPalette()
          //   meta.color = color       
            meta.dirName = dirName
            meta.title = meta.title || meta.artist.join(',')
            meta.directoryId = directory.id
            meta.baseDir = baseDir
            meta.dir = baseDir
            meta.genre = meta.genre.toString()
            meta.artist = meta.artist.toString()
            musics.push(meta)
            saveSong(meta,baseDir)
            .then(savedSong=>{
              // if(hasArtwork){
              //   db.Song.update({
              //     artwork : image 
              //   },{
              //     where : {
              //       id : savedSong[0].id 
              //     }
              //   })
              // }else {
              //    getArtwork(songName).then(artwork=>{
              //   // console.log(artwork`,'slmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')   
              //     if(artwork){
              //        saveArtwork(artwork,artowrkAbsolutePath).then(saveImage =>{
              //         // console.log(saveImage,'-----------')
              //         db.Song.update({
              //           artwork : image 
              //         },{
              //           where : {
              //             id : savedSong[0].id 
              //           }
              //         })
              //        })
              //     }
              //    }).catch(e=>{
              //      console.log(e,'got error getArtwork')
              //    })
               
              // }
            })
           
           
         
        }


    }
}catch(e){
    console.log(e,'find songs function')  
}

  }
  // createAlbum(musics)  
  return musics
}catch(e){
  console.log(e,'hhhh')
  throw e
}
 }
async function createAlbum(song){
  try{
    let album = await db.Album.findOrCreate({
      where : {
        title : song.album,
        artist : song.artist
      }
    })
    if(album[1] == true){
      let image =  album[0].title+'.jpg'
      let artowrkAbsolutePath ='./public/'+image 
      getArtwork(album[0].title).then(artwork=>{
        // console.log(artwork`,'slmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm')   
          if(artwork){
             saveArtwork(artwork,artowrkAbsolutePath).then(saveImage =>{
              // console.log(saveImage,'-----------')
              db.Album.update({
                artwork : image 
              },{
                where : {
                  id : album[0].id 
                }
              })
             })
          }
         }).catch(e=>{
           console.log(e,'got error getArtwork')
         })
       
    }

    return album[0]
  }catch(e){
    console.log(e)
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

 const saveSong =  async (meta,baseDir) =>{
   console.log(meta.duration,'durationnnnnnnnnnnnnnnnnn')
   let album = await createAlbum(meta)
  return db.Song.findOrCreate({
    where : {
      path : meta.fullPath
    },
    defaults : {
      title : meta.title,
      album :meta.album,
      albummId : album.id , 
      directoryId : meta.directoryId,
      // artwork :meta.name,
      // fileName :meta.name,
      genre :meta.genre,
      artist :meta.artist,
      year :meta.year,
      // color :meta.name,
      dirName :meta.dirName,
      fullPath :meta.fullPath,
      duration : meta.duration
    }
  })

 }

 module.exports = {
   getDirFiles , getArtwork , getMusicMeta , findSongs
 }