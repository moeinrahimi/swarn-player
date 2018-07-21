import React from 'react';
import config from '../../constants/config'
const noImage = config.baseURL + 'default.jpg'
export default (props =>{
 return (
<img src={props.image   ? config.baseURL  + props.image : noImage}/>
 ) 
})