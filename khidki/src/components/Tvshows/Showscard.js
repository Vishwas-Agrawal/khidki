import React from 'react'
import userImage from './../../Assests/noprofile.jpg'
import { useHistory } from "react-router-dom";

function Showscard({movie}) {   
    const history = useHistory();
    const gotoPage= () =>{      
        history.push(`/showprofile/${movie.id}`);
    }
    return (
        <div style={{display:"inline-block",marginBottom:"3%",marginLeft:"2%"}}>
        <div className="movie-card-2" onClick={gotoPage}><img  src={ movie.poster_path===null?userImage:`https://www.themoviedb.org/t/p/w220_and_h330_bestv2${movie.poster_path}`}  />
        </div>
        <div className="profile-name">{movie.name.slice(0,30)}</div> 
        </div>
    )
}

export default Showscard
