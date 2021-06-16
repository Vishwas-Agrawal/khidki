import axios from "axios";
import React, { useEffect, useState } from "react";
import userImage from "../../Assests/noprofile.jpg";
import { useHistory } from "react-router-dom";
import Loader from '../Loader'
import CustomNavbar from "../CustomNavbar";

function Profile({ match }) {
  let history = useHistory();
  const [personData, setPersonData] = useState("");
  const [movieData, setMovieData] = useState([]);
  const apiii = async () => {
    try {
      const Pres = await axios.get(
        `https://api.themoviedb.org/3/person/${match.params.id}?api_key=e6c3a904074f171fe45b4f5474a0cc20&language=en-US`
      );
      setPersonData(Pres.data);
      console.log(Pres.data);
      const Mdata = await axios.get(
        `https://api.themoviedb.org/3/person/${match.params.id}/movie_credits?api_key=e6c3a904074f171fe45b4f5474a0cc20&language=en-US`
      );
      setMovieData(Mdata.data.cast);
      console.log(Mdata.data.cast);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    apiii();
  }, []);
  return (
    <div>
      {movieData.length ? (
        <div>
          <CustomNavbar/>
          <div
            className="peopleback"
            style={{
              backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieData[0].backdrop_path})`,
            }}
          ></div>
          <div className="overlay">
            <h1 className="profilename">{personData.name}</h1>
          </div>
          <div className="profile">
            <div className="profilepic">
              <img
                src={
                  personData.profile_path === null
                    ? userImage
                    : `https://www.themoviedb.org/t/p/w300_and_h450_face${personData.profile_path}`
                }
                className="profileimage"
              />
            </div>
          </div>
          <div className="profileMatter">
            <h1 className="mons">Biography</h1>
            <p className="mons">{(personData.biography.length?personData.biography:"We don't have person's biography to show")}</p>
            <h1 className="mons">Known for</h1>
            <div className="scrolling-wrapper2" id="ex3">
              <div style={{ margin: "0px" }}>
                {movieData.map((x) => {
                  if (x.backdrop_path != null) {
                    return (
                      <div
                        className="horizontalcomponent2"
                        style={{ zIndex: "9", marginTop: "3%" }}
                      >
                        <input
                          type="Image"
                          src={`https://www.themoviedb.org/t/p/w150_and_h225_multi_faces${x.backdrop_path}`}
                          style={{ width: "150px", height: "230px" }}
                          className="imagebutton2"
                          onClick={() => {
                            history.push(`/Movieprofile/${x.id}`);
                          }}
                        ></input>
                        <p
                          className="mons"
                          style={{ fontSize: "15px", color: "black" }}
                        >
                          {x.title}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader/>
        
      )}
      
    </div>
  );
}

export default Profile;
