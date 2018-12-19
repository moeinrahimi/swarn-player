const {io}=require('../app.js')

const emit = (key,val)=>{
  return io.emit(key,val)
}
module.exports.emit=emit