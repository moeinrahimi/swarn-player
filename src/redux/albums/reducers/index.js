import Sound from 'react-sound'
const initialState = {
  albums: [],
  album : {},
  songURL: '',
  playingStatus: Sound.status.STOPPED,
  songIndex: 0,
  isPlaying: 0,
  songId: '',
  song: {},
  songs : [],
  shuffle : 0,
  audio : new Audio(),
  currentAlbum : {},
  currentSongs : [],
  currentPlaylist : [],
  playlist : {},
  
};
const rootReducer = (state = initialState, action) => {
  // console.log(action,'action')
  switch (action.type) {
    case 'SET_ALBUMS':
    return { ...state, albums: action.payload };
    case 'SET_SONG':
    return { ...state, song: action.payload };
    case 'SET_ISPLAYING':
    return { ...state, isPlaying: action.payload };
    case 'SET_SONGS':
    return { ...state, songs: action.payload };
    case 'SET_ALBUM':
    return { ...state, album: action.payload };
    // case 'SET_CURRENT_SONGS':
    // return { ...state, songs: action.payload };
    case 'SET_CURRENT_ALBUM':
    return { ...state, currentAlbum: action.payload };
    case 'SET_CURRENT_PLAYLIST':
    return { ...state, currentPlaylist: action.payload };
    case 'SET_PLAYLIST':
    return { ...state, playlist: action.payload };

    case 'SET_SONGDETAILS':
    // console.log(action.payload.isPlaying ? action.payload.isPlaying :  state.isPlaying,' ply bede ------')
    return { ...state,
        songURL: action.payload.songURL || state.songURL,
        playingStatus: action.payload.playingStatus || state.playingStatus,
        songIndex: action.payload.songIndex || state.songIndex,
        songId: action.payload.songId || state.songId,
        audio: action.payload.audio || state.audio,
        shuffle: action.payload.shuffle || state.shuffle,
     };
    default:
      return state;
  }
};
export default rootReducer;

