import React from 'react'
import userImage from './../../Assests/noprofile.jpg'
import { useHistory } from "react-router-dom";

function Moviescard({movie}) {   
    const history = useHistory();
    const gotoPage= () =>{      
        history.push(`/Movieprofile/${movie.id}`);
    }
    return (
        <div style={{display:"inline-block",marginBottom:"3%",marginLeft:"2%"}}>
        <div className="movie-card-2" onClick={gotoPage}><img  src={ movie.poster_path===null?userImage:`https://www.themoviedb.org/t/p/w220_and_h330_bestv2${movie.poster_path}`}  />
        </div>
        <div className="profile-name">{movie.original_title.slice(0,30)}</div> 
        </div>
    )
}

export default Moviescard
