export const setAlbums = albums => ({ type: "SET_ALBUMS", payload: albums });
export const setAlbum = album => ({ type: "SET_ALBUM", payload: album });

export const setCurrentSong = albums => ({ type: "SET_SONG", payload: albums });
export const setSongDetails = albums => ({ type: "SET_SONGDETAILS", payload: albums });
export const setIsPlaying = isPlaying => ({ type: "SET_ISPLAYING", payload: isPlaying });
export const setSongs = isPlaying => ({ type: "SET_SONGS", payload: isPlaying });