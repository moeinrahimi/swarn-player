import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import bulma from './assets/css/bulma.css'
import styleAll from './assets/css/style.css';
ReactDOM.render(
  <Router>
<Routes />
</Router>
, document.getElementById('root'));
registerServiceWorker();
