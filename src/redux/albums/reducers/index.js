const initialState = {
  albums: []
};
const rootReducer = (state = initialState, action) => {
  // console.log(state,action,'------')
  switch (action.type) {
    case 'SET_ALBUMS':
    return { ...state, albums: action.payload };
    case 'SET_SONG':
    return { ...state, song: action.payload };
    default:
      return state;
  }
};
export default rootReducer;
