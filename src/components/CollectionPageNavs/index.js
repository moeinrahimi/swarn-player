import React from 'react';
import { Link} from "react-router-dom";

export default (props =>{
return (
<nav>
          <Link className="link " to={{ pathname: `/collection`}}>PLAYLISTS</Link>
          {/* <Link className="link active-link" to={{ pathname: `/collection`}}>PLAYLISTS</Link> */}
          <Link className="link" to={{ pathname: `/favorited`}}>Favortited Songs</Link>
        </nav>
) 
})