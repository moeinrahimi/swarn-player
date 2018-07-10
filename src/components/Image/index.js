import React, { Component } from 'react';
import config from '../../constants/config'
export default (props =>{
 return (
<img src={config.baseURL  + props.image}/>
 ) 
})