const fs = require('fs')
const path = require('path')
const folders = ["F:/music/Ellie Goulding","F:/music/Eminem - Revival [Album] [iTunes Version] - [7tunes]"]

const a =  ( async (folders,isDir=false)=>{
  // console.log(folders)
  for(let i = 0;i<folders.length;i++){
    let folder = folders[i]
    let dataFolder = fs.readdirSync(folder)
    getData(dataFolder,folder,isDir)
  }
})
a(folders)


function getData(dataFolder,folder=undefined,isDir){
  let files = []
  for(let i = 0;i<dataFolder.length;i++){
    let data = dataFolder[i]
    let dir = path.resolve(folder,data)
    let stat = fs.statSync(dir)
    if(stat.isDirectory()){
      // console.log(dir,'dir')
    a([dir])
      
    }else{
      // console.log(dir,'file')
      files.push(dir)
      // if(folder == ){
        break
      // }
      
    }
  }
  console.log(files)

}