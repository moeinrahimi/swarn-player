import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import fontIcon from './assets/css/materialicon/materialdesignicons.css';
import styleAll from './assets/css/style.css';
import resetCss from './assets/css/reset.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
// styleAll();
// resetCss();
