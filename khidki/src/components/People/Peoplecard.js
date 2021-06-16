import React, {useState} from 'react'
import userImage from './../../Assests/noprofile.jpg'
import  {useHistory} from 'react-router-dom'

function Peoplecard({people}) {   
    const history = useHistory();
    const gotoPage= () =>{      
        history.push(`/peopleprofile/${people.id}`);
    }
    return (
        <div style={{display:"inline-block",marginBottom:"3%",marginLeft:"2%"}}>
        <div className="profile-card-2" onClick={gotoPage}><img  src={ people.profile_path===null?userImage:`https://www.themoviedb.org/t/p/w235_and_h235_face${people.profile_path}`} className="img img-responsive" />
        </div>
        <div className="profile-name">{people.name}</div> 
        </div>
    )
}

export default Peoplecard
