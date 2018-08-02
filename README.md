
# swan-player

  

swan-player is a music player web application, it is basically spotify clone (only by looks) for your home streaming music .

  
  

# Screenshot

-------------

![swan-player home page](https://i.imgsafe.org/bf/bfaa4ef924.png)

  
  
  

# getting started

make sure you have a working installation of redis and mysql .

``` bash

git clone https://github.com/moeinrahimi/swan-player.git

cd swan-player

node install.js // installs dependencies
change server ip located at src/config.js if you need to defaults to localhost:8181
at last simply run :
npm start && npm run server
```

  

# Features

- you can add as many folders you want
- fast on adding songs
- sort songs based on albums
- create playlists and add songs to them
- search in songs and albums

  
  

# Technologies Used

- react with create react app
- redux
- mysql
- nodejs express

# Contributing

you can in making swan-player better by contributing in adding new features to it, see TODO list to find out what is needed right now

  

# TODO List

- [ ] list all songs

- [ ] list all albums

- [ ] clean code to make it more readable

- [ ] use node-ffmetadata to create metadata for songs that doesnt have any meta

- [ ] use flaticons instead of font awesome 

- [ ] repeat funcitonality

- [ ] resonsive on mobile

- [x] shuffle funcitonality

- [x] volume controller

- [x] search in songs

- [x] recently played songs

- [x] make playlist


- [x] use mysql for persistent storage

- [x] fix issue where getting songs on multiple config directories only gets first directory