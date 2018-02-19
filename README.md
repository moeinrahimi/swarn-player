# swan-player

swan-player is a music player web application, it aims to be simple yet powerful

# getting started
make sure you have a working installation of  redis and mysql . 
``` bash
git clone https://github.com/moeinrahimi/swan-player.git
cd swan-player
npm install
cd server
npm install
cd ..
npm start
cd server 
npm start
```

# Features
- supporting multiple directories
- fast on startup (thanks to redis)
- see todo for incoming features


# Technologies Used 
- react with create react app 
- redis 
- mysql
- nodejs express

# TODO List
- [ ] shuffle funcitonality
- [ ] volume controller  
- [ ] repeat funcitonality
- [ ] search in songs 
- [ ] recently played songs 
- [ ] make playlist
- [ ] clean code to make it more readable
- [ ]  use node-ffmetadata to create metadata for songs that doesnt have any meta
- [x] use redis to store songs 
- [x] use mysql for persistent storage
- [x] fix issue where getting songs on multiple config directories only gets first directory

 

