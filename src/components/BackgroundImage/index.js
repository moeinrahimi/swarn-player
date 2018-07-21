import React from 'react';
import './style.css'
 const BackgroundImage = (props) => {
  let {url} = props
  return (
    <div id="backgroundImage" style={{'backgroundImage':`url("${url}")`}}> </div>
  )
}
export default BackgroundImage