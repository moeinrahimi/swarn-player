
const initialState = {
  newSongInfo : {} ,
  io: {}
};
const socketReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'SET_NEW_SONG_COUNTER':
            return { ...state, newSongInfo: action.newSongInfo };
        case 'INIT_IO':
            return { ...state, io: action.io };
        default:
            return state;
    }
};
export default socketReducer;
