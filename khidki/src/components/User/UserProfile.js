import React, { useEffect, useState } from "react";
import build from "./../../Assests/build3.jpg";
import femalepic from "./../../Assests/femaleimages.jpg";
import malepic from "./../../Assests/maleimages.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNavbar from '../CustomNavbar'
import {useHistory} from 'react-router-dom'
import { useSelector } from "react-redux";
function UserProfile({ match }) {
  
  const temp = useSelector((state) => {
    return state.token;
  });
     
  const history = useHistory();
  const [userData, setUserData] = useState("");
  useEffect(() => {
     
    const apiii = async () => {
      try {
        let res = await fetch(`/profile/${match.params.id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            'authorization': 'Bearer '+ temp
          },
        });
        res = await res.json();        
        console.log(res);
        setUserData(res);
      } catch (err) {
        console.log(err.message);
      }
    };
    apiii();
    
  }, []);
  if (userData.user == null) {
    return false;
  }
  userData.user.name =
    userData.user.name.charAt(0).toUpperCase() + userData.user.name.slice(1);
  return (
    <div>
      <CustomNavbar></CustomNavbar>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${build})`,
          backgroundSize: "100%",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            width: "50%",
            height: "100vh",
            backgroundColor: "#f8ede3",
            marginLeft: "50%",
            zIndex: "10",
            textAlign: "left",
            padding: "20px",         
          }}
        >
          <table>
            <tr >
              <th style={{paddingLeft:"20px",paddingTop:"20px"}}>CONTACT DETAILS</th>              
            </tr>
            <tr>
              <td style={{paddingTop:"20px",paddingLeft:"30px"}}>EMAIL&nbsp;&nbsp;&nbsp;<a class="icon-envelope" style={{fontSize:"30px",color:"black"}}></a></td>
              <td style={{paddingTop:"20px",paddingLeft:"30px"}}>MOBILE-NO&nbsp;&nbsp;&nbsp;<a class="icon-phone" style={{fontSize:"30px",color:"black"}}></a></td>
            </tr>
            <tr>
              <td style={{paddingLeft:"30px"}}>{userData.user.email}</td>
              <td style={{paddingLeft:"30px"}} >{userData.user.mobileNo}</td>
            </tr>
            <tr>
              <th style={{paddingLeft:"20px",paddingTop:"40px"}}>PERSONAL DETAILS</th>
            </tr>
            <tr>
              <td style={{paddingTop:"20px",paddingLeft:"30px"}}>NAME&nbsp;&nbsp;&nbsp;<a class="icon-user" style={{fontSize:"30px",color:"black"}}></a></td>
              <td style={{paddingTop:"20px",paddingLeft:"30px"}}>DATE OF BIRTH&nbsp;&nbsp;&nbsp;<a class="icon-calendar" style={{fontSize:"30px",color:"black"}}></a></td>              
            </tr>
            <tr>
              <td style={{paddingLeft:"30px"}}>{userData.user.name}</td>
              <td style={{paddingLeft:"30px"}}>{userData.user.birthday}</td>
            </tr>
            <tr>
              <td style={{paddingTop:"20px",paddingLeft:"30px"}}>GENDER&nbsp;&nbsp;&nbsp;<a class="icon-male" style={{fontSize:"30px",color:"black"}}></a></td>
              <td style={{paddingTop:"20px",paddingLeft:"30px"}}>COUNTRY&nbsp;&nbsp;&nbsp;<a class="icon-globe" style={{fontSize:"30px",color:"black"}}></a></td>
            </tr>
            <tr>
              <td style={{paddingLeft:"30px"}}>{userData.user.gender}</td>
              <td style={{paddingLeft:"30px"}} >{userData.user.country}</td>
            </tr>
          </table>
          <h4 style={{marginLeft:"20px",marginTop:"20px",fontFamily: "Fira Sans", fontWeight:"bold"}}>FAVORITE MOVIES</h4>  
          <div style={{ marginLeft: "6%" }}>
                <div
                  className="scrolling-wrapper3"
                  style={{ marginTop: "-2%" }}
                  id="ex3"
                >
                  <div style={{ margin: "0px" }}>
                    {userData.user.favoriteMovies.map((x) => {
                      console.log(x);
                      if (x.moviephoto != null) {
                        
                        return (
                         
                          <div
                            className="horizontalcomponent2"
                            style={{ zIndex: "9", marginTop: "3%" }}
                          >
                            <input
                              type="Image"
                              src={`https://www.themoviedb.org/t/p/w150_and_h225_multi_faces${x.moviephoto}`}
                              style={{ width: "150px", height: "230px" }}
                              className="imagebutton2"
                              onClick={() => {
                                history.push(`/movieprofile/${x.movieid}`);
                              }}
                            ></input>
                            <p
                              className="mons"
                              style={{ fontSize: "15px", color: "white" }}
                            >
                              {x.name}
                            </p>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
        </div>
        <div
          className="UserPic"
          style={{
            backgroundImage: ((userData.user.gender=='Male')?`url(${malepic})`:`url(${femalepic})`),
            backgroundSize: "100%",
          }}
        ></div>
        <p className="UserName">{userData.user.name}</p>
      </div>
    </div>
  );
}

export default UserProfile;
