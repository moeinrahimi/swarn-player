import React from 'react';
import Sound from 'react-sound';

export default class MYSOUND extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return <Sound {...this.props} />; // Check props in next section
  }
}