const metaData = require('musicmetadata');
const axios = require('axios')
const path = require('path')
const fs =require('fs')
const Vibrant = require('node-vibrant')
const nanoid = require('nanoid')

const getMusicMeta = (file) => {
  return new Promise((resolve,reject)=>{
    let stream = fs.createReadStream(file)
    metaData(stream,(err,meta)=>{
      if(err) {
        // console.log(file,'get music data err')
        reject('err')
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
var findSongs = async function (baseDir,isDir=false,musics)  {
  // console.log(baseDir)
  // return
  
  try{
    let count = 0 
    musics =musics || []
    var files = await getDirFiles(baseDir)
    // console.log(files)
    // return
    for(let i =0;i<files.length;i++){
      try {
        let file = files[i]
        var musicPath = `${baseDir}/${file}`
        // console.log(musicPath)
        // continue
        let stat = fs.lstatSync(musicPath)    
        if(stat.isDirectory()){
          // check if there is a dir inside dir
          // let dirFiles = await getDirFiles(musicPath)
        //   for(let i =0;i<dirFiles.length;i++){
        //     let dirFile = dirFiles[i]
        //     console.log(dirFile)
        //     if(fs.lstatSync(musicPath+'/'+dirFile).isDirectory() ){
        //       await findSongs(musicPath+'/'+dirFile,false,musics)
        //     }   
        // }
        console.log(musicPath,'isDir')
          await findSongs(musicPath,true,musics)
        }else if(count == 0 && baseDir) { 
          console.log(musicPath,'------')
        let meta = await getMusicMeta(musicPath)
        count = 1
        if(meta){
        //   meta.music = musicPath
          delete meta.picture
          
          meta.id = nanoid()
          let dirName = path.basename(path.dirname(musicPath))    
          let songName = meta.title || meta.album
          let artowrkAbsolutePath ='./public/'+songName+'.jpg'
          
          let saveImage 
          let hasArtwork = fs.existsSync(artowrkAbsolutePath)
          
          if(hasArtwork){
            meta.artwork = songName+'.jpg'
          }else {
            let artwork = await getArtwork(songName)
            if(artwork){
              saveImage =  await saveArtwork(artwork,artowrkAbsolutePath)
            }else{
              console.log('nadarad')
              meta.artwork = 'default.jpg'
               artowrkAbsolutePath ='./public/default.jpg'

            }
          }
            
          
        let color = await  Vibrant.from(artowrkAbsolutePath).getPalette()
            meta.color = color       
            meta.dirName = dirName
            meta.baseDir = baseDir
            meta.dir = baseDir
            meta.isDir = true 
            musics.push(meta)
        }
        if(isDir){
          break
        }

    }
}catch(e){
    console.log(e,'injaaaaaaa')  
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

 module.exports = {
   getConfig , getDirFiles , getArtwork , getMusicMeta , findSongs
 }