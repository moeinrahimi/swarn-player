const metaData = require('musicmetadata');
const axios = require('axios')
const path = require('path')
const fs =require('fs')
const Vibrant = require('node-vibrant')
const {cleanFileName} = require('./file')
const db =require('../models')
const {emit} = require('./socket')

const getMusicMeta = (file) => {
  return new Promise((resolve,reject)=>{
    let stream = fs.createReadStream(file)
    metaData(stream,(err,meta)=>{
      if(err) {
        // console.log(file,'get music data err')
        return reject('could not find metadata header for' + file)
      }
      stream.close();
     return  resolve(meta)
  })
})
}
       
const getArtwork = (name) => {
  console.log('getArtwork',name)
  return new Promise((resolve, reject)=>{
    const url = `https://itunes.apple.com/search?term=${name}&limit=1&media=music`
    // console.log(url)
    axios.get(url)
    .then(res=>{
      // console.log(res.data , 'itunesssss')
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

var findSongs = async function (directory)  {
   let musics =  []
   let songCounter = 0 
   let baseDir = directory.path
  //  console.log(baseDir,'aaaaaaaaaaaaaaaaaa')
  try{
    var files = await getDirFiles(baseDir)
    // console.log(files,'getDirFiles')
    for(let i =0;i<files.length;i++){
      try {
        let file = files[i]
        var musicPath = `${baseDir}/${file}`
        let stat = fs.lstatSync(musicPath)    
        
        if(stat.isDirectory()){
          // console.log(musicPath,'is directory : true ')
          // console.log(musicPath,'isDir')
            findSongs({id:directory.id , path:musicPath})
        }else{
          let {ext,name} = path.parse(musicPath)
          
          if (!['.mp3','.m4a'].includes(ext)) continue
        // console.log(musicPath,'is directory : false ')
        let meta = await getMusicMeta(musicPath)
        if(meta){
        //   meta.music = musicPath
          meta.fullPath = musicPath
          let dirName = path.basename(path.dirname(musicPath))    
          // let songName = meta.title || meta.album
          // csongName = cleanFileName(songName)
          
          
          //   let image =  csongName+'.jpg'
          //   let artowrkAbsolutePath ='./public/'+image 
          //   let hasArtwork = fs.existsSync(artowrkAbsolutePath)
          //   meta.artwork = hasArtwork ? image : 'default.jpg' 
          //   let color = await  Vibrant.from(hasArtwork ? artowrkAbsolutePath : './public/default.jpg' ).getPalette()
          //   meta.color = color       
            meta.dirName = dirName
            meta.directoryId = directory.id
            meta.baseDir = baseDir
            meta.dir = baseDir
            meta.genre = meta.genre.toString()
            meta.artist = meta.artist.toString()
            // musics.push(meta)
            if(!meta.title){
              // console.log(meta.title)
              meta.title = name
              // console.log(meta.title)
            }
            let album = await createAlbum(meta)
            let song = await saveSong(meta,album)
            songCounter += 1
            if (song[1] == true) emit('NEW_SONG', songCounter)
            
            
        }
        continue
      }
    
}catch(e){
    console.log(e,'find songs function')  
}

  }
  // createAlbum(musics)  
  return true 
}catch(e){
  console.log(e,'hhhh')
  throw e
}
 }
function createAlbum(song){
  return new Promise((resolve,reject)=>{
    db.Album.findOrCreate({
      where : {
        title : song.album,
        artist : song.artist
      }
    }).then((album)=>{
      
      if(album[1] == true){
        
        // console.log('new album' + album[0].title)
        let fileName = song.title || song.album
        let cleanFileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();

        let image = cleanFileName + '.jpg'
        let artowrkAbsolutePath ='./public/'+image 
        let artist = song.artist || ''
        if(song.picture && song.picture.length > 0){
          try {
            
          fs.writeFileSync(artowrkAbsolutePath, song.picture[0].data)
                  db.Album.update({
                    artwork : image 
                  },{
                    where : {
                      id : album[0].id 
                    }
                  })
          } catch (error) {
            console.log(error)
          }
        }
          
        // getArtwork(album[0].title + ' ' + artist  ).then(artwork=>{
        //     if(artwork){
        //        saveArtwork(artwork,artowrkAbsolutePath).then(saveImage =>{
        //         db.Album.update({
        //           artwork : image 
        //         },{
        //           where : {
        //             id : album[0].id 
        //           }
        //         })
        //        })
        //     }
        //    }).catch(e=>{
        //      console.log(e,'got error getArtwork')
        //    })
         
      }
      return resolve(album[0])
    })
    
    
  })

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

 const saveSong =  async (meta,album) =>{
  //  console.log(meta.duration,'durationnnnnnnnnnnnnnnnnn')
   
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