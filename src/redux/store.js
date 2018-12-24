import { createStore, combineReducers, applyMiddleware } from "redux";
import albumReducer from "./albums/reducers";
import socketReducer from "./socket/reducers";
import thunk from 'redux-thunk'


let reducers = combineReducers({
  socketReducer,
  albumReducer
})

let middleware = [thunk];

const store = createStore(
        reducers,
        applyMiddleware(...middleware)
    );

export default store;