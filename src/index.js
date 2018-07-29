import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import './assets/css/bulma.css'
import './assets/css/style.css';
import './assets/flaticons/flaticon.css'

ReactDOM.render(
    <Provider store={store}>
  <BrowserRouter>
  
  <Route path='/'  component={Routes}>
  </Route>
</BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
