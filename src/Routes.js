import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import App from './App'
import AlbumPage from './pages/AlbumPage'

const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

const Airport = () => (
  <div>
     <ul>
      <li>Jomo Kenyatta</li>
      <li>Tambo</li>
      <li>Murtala Mohammed</li>
    </ul>
  </div>
);

const City = () => (
  <div>
    <ul>
      <li>San Francisco</li>
      <li>Istanbul</li>
      <li>Tokyo</li>
    </ul>
  </div>
);

class Routes extends Component {
  render() {
    return (
      <div>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/airports">Airports</Link></li>
          <li><Link to="/cities">Cities</Link></li>
        </ul> */}

        <Route path="/" exact  component={App}/>
        <Route path="/album/:id" component={AlbumPage}/>
        
      </div>
    );
  }
}

export default Routes;