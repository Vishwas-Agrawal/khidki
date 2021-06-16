import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import moment from 'moment'
export default function Searchresult({search})
{
  var str=search.overview;
   if (str.length>240)
    {
        str=search.overview.slice(0,240)+'....'
    }
    return (
    
  <div className="movie_card" id="bright" >
        <div className="info_section">
            <div className="movie_header">      
              <h1 style={{color: "#fff" ,fontWeight: "400",fontSize:"30px"}}>{search.original_title}</h1>
              <h4 style={{color: "#9ac7fa",fontWeight: "400"}}>{moment(search.release_date).format("ll")}</h4>      
            </div>
            <div className="movie_desc">
              <p className="text">
                  Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for. 
              </p>
            </div>    
        </div>
        <div className="blur_back bright_back" style={{backgroundImage:`url(https://www.themoviedb.org/t/p/original${search.poster_path})`,backgroundRepeat: 'no-repeat',backgroundSize: "100% 110%"}}></div>
  </div>


     
     )

}