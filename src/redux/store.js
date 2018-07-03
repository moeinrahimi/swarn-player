import { createStore } from "redux";
import rootReducer from "./albums/reducers";
// import Reactotron from 'reactotron-react-js'
// const store = Reactotron.createStore(rootReducer)
const store = createStore(rootReducer);
export default store;