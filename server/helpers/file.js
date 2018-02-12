const cleanFileName = (name)=>{
const IllegalSymbols = ['/', '?', '<', '>', '\\', ':', '*', '|' , '"' ]
for(let i =0 ;i<IllegalSymbols.length;i++){
  let symbol = IllegalSymbols[i]
  let index =name.indexOf(symbol) 
  if(index != -1){
    console.log(index)
    name = name.replace(symbol,'')
  }
}
return name

}

module.exports = {
  cleanFileName:cleanFileName
}