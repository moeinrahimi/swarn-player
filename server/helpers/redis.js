var redis = require("redis"),
client = redis.createClient();

const set = (key,val)=>{
  return new Promise((resolve,reject)=>{
    client.set(key,val,(err,reply)=>{
      if(err) reject(err)
      resolve(reply)
    })
  })
}
const get = (key)=>{
  return new Promise((resolve,reject)=>{
    client.get(key,(err,reply)=>{
      if(err) reject(err)
      resolve(reply)
    })
  })
}
const remove = (key)=>{
  return new Promise((resolve,reject)=>{
    client.del(key,(err,reply)=>{
      if(err) reject(err)
      resolve(reply)
    })
  })
}

module.exports = {
  set,get,remove
}