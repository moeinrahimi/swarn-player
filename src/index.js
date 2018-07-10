// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import bulma from './assets/css/bulma.css'
// import styleAll from './assets/css/style.css';
// ReactDOM.render(
//   <Router>
// <App />
// </Router>
// , document.getElementById('root'));
// registerServiceWorker();
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import AlbumPage from './components/Albums';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route,Switch, Link,IndexRoute } from "react-router-dom";
import bulma from './assets/css/bulma.css'
import styleAll from './assets/css/style.css';
import store from "./redux/store";
import { addArticle } from "./redux/albums/actions";
import { Provider } from "react-redux";
ReactDOM.render(
    <Provider store={store}>
  <BrowserRouter>
  
  <Route path='/'   component={Routes}/>
</BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
