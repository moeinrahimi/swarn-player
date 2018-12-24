import io from 'socket.io-client';
import store from '../../store'
export const setSongCounter = (newSongInfo) => ({
    type: 'SET_NEW_SONG_COUNTER',
    newSongInfo

})
export const initIo = (io) => ({
    type: 'INIT_IO',
    io

})
export const initializeIO = (dirId) => {
    
    return (dispatch) => {
        let socket = io.connect('http://127.0.0.1:8181', {
            transports: ['websocket', 'xhr-polling']
        })
         dispatch(initIo(socket))
         
    }
}
export const syncSongs = (dirId) => {
    let socket = store.getState().socketReducer.io
    console.log(socket)
    return (dispatch) => {
        //  socket.on("connect", function() {
         console.log('connected')
         socket.emit('sync_songs', dirId)
            //  })
         socket.on('NEW_SONG', function(newSongInfo) {
         dispatch(setSongCounter(newSongInfo))
         })
    }
}
