import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from "react-router-dom";
import bulma from './assets/css/bulma.css'
import styleAll from './assets/css/style.css';
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
    <Provider store={store}>
  <BrowserRouter>
  
  <Route path='/'  component={Routes}>
  </Route>
</BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
