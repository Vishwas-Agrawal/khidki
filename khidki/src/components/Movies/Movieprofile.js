import axios from "axios";
import React, { useEffect, useState } from "react";
import userImage from "../../Assests/noprofile.jpg";
import CustomNavbar from '../CustomNavbar'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";

function Profile({ match }) {
  let history = useHistory();
  const [movieData, setMovieData] = useState([]);  
  const [circle, setCircle] = useState("");
  const [castData, setCastData] = useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = useState("");
  const [links, setLinks] = useState("");
  const [helpcolor, setHelpcolor] = useState("white");

  const _id = useSelector((state) => {
    return state._id;
  });
  const token = useSelector((state) => {
    return state.token;
  });
  const hideModal = () => {
    setIsOpen(false);
  };
  const likebuttoncolorjugaad = async () =>{
    try {
      let res = await fetch(`/profile/${_id}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      res = await res.json();
      res = res.user;

      console.log(movieData.id);
      var i = 0;
      for (i = 0; i < res.favoriteMovies.length; i++) {
        console.log(res.favoriteMovies[i]);
        console.log(movieData.id);
        if (res.favoriteMovies[i].movieid === JSON.stringify(movieData.id)) {
          setHelpcolor( "red");
          console.log("found");
          break;
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const apiii = async () => {
    try {
      const Mdata = await axios.get(
        `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US`
      );
      const Cdata = await axios.get(
        `https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=7372ae765660f35a9b2e71883bb705a5&language=en-US`
      );
      const linkdata = await axios.get(
        `https://api.themoviedb.org/3/movie/${match.params.id}/external_ids?api_key=7372ae765660f35a9b2e71883bb705a5`
      );

      setMovieData(Mdata.data);
      setCircle(`${Mdata.data.vote_average * 10},100`);
      setCastData(Cdata.data.cast);
      setLinks(linkdata.data);

    
    } catch (err) {
      console.log(err.message);
    }
  };

  const showModal = async () => {
    try {
      const response = await axios.get(
        `http://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=7372ae765660f35a9b2e71883bb705a5`
      );
      setQuery(response.data.results[0].key);
      setIsOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const Likeit = async () => {
    if(helpcolor == "red"){
      await setHelpcolor("white");
    }
    else{
    await setHelpcolor("red");
    }
    console.log(helpcolor);
    fetch("/like", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        __id: _id,
        moviephoto: movieData.poster_path,
        movieid: movieData.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((res) => console.log(res))
      .catch((res) => console.log(res));
  };

  useEffect(() => {
    console.log("mast");
    if(movieData.length==0)
    {
      console.log("hello");
      apiii();
      console.log(movieData);
    }
    else{
      console.log("iskeniche")
      console.log(movieData.length);
      likebuttoncolorjugaad();  
    }
  }, [movieData]);

  return (
    <div>
      {castData.length ? (
        <>
        <CustomNavbar/>
        <div
          style={{ backgroundColor: "black", margin: "0px", padding: "0px" }}
        >
          <div>
            <div
              className="peopleback"
              style={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movieData.backdrop_path})`,
              }}
            ></div>
            <div className="overlay"></div>
            <div className="movieprofilename">
              <h1>{movieData.original_title}</h1>
              <p className="genres">{movieData.release_date}&nbsp;&nbsp;</p>
              <p style={{ display: "inline", fontSize: "50px" }}>
                &dagger;&nbsp;
              </p>
              {movieData.genres !== undefined
                ? movieData.genres.map((x) => {
                    return <p className="genres">{x.name}&nbsp;,&nbsp;</p>;
                  })
                : ""}
              <p style={{ display: "inline", fontSize: "50px" }}>
                &dagger;&nbsp;
              </p>
              <p className="genres">
                {parseInt(movieData.runtime / 60)}h&nbsp;
                {movieData.runtime % 60}m
              </p>
              <br />
              <svg viewBox="0 0 36 36" class="circular-chart2">
                <path
                  class="circle2"
                  stroke-dasharray="100, 100"
                  d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path
                  class="circle"
                  stroke-dasharray={circle}
                  d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>

              <div className="votecircle">
                <h3 className="votevalue">{movieData.vote_average * 10}%</h3>
              </div>
              <a
                className="icon-heart"
                onClick={Likeit}
                style={{ color: helpcolor }}
                id="fav"
              ></a>
              <p
                style={{
                  fontFamily: "Lato",
                  fontSize: "20px",
                  color: "white",
                  display: "inline",
                }}
              >
                Rating
              </p>
              <p
                style={{
                  fontFamily: "Lato",
                  fontSize: "20px",
                  color: "white",
                  display: "inline",
                  marginLeft: "2%",
                }}
              >
                Favorite
              </p>
              <p
                style={{ display: "inline", marginLeft: "2%" }}
                className="trailer"
              >
                <a onClick={() => showModal()}>
                  <a
                    className="icon-caret-right"
                    onClick={() => showModal()}
                    style={{ marginTop: "4px" }}
                  ></a>{" "}
                  Play Trailer
                </a>
              </p>
              <br />
              <br />
              <h3>Overview</h3>
              <p style={{ color: "white", fontSize: "19px", maxWidth: "80%" }}>
                {movieData.overview}
              </p>
            </div>
            <div className="movieprofile">
              <img
                src={
                  movieData.poster_path === null
                    ? userImage
                    : `https://www.themoviedb.org/t/p/w300_and_h450_face${movieData.poster_path}`
                }
                className="profileimage"
              />
            </div>
          </div>
          <div className="belowbac">
            <h3
              style={{
                marginTop: "2%",
                marginLeft: "6%",
                fontFamily: "Josefin Sans",
                color: "white",
              }}
            >
              Top Billed Cast
            </h3>
            <div style={{ marginLeft: "6%" }}>
              <div
                className="scrolling-wrapper3"
                style={{ marginTop: "-2%" }}
                id="ex3"
              >
                <div style={{ margin: "0px" }}>
                  {castData.map((x) => {
                    if (x.profile_path != null) {
                      return (
                        <div
                          className="horizontalcomponent2"
                          style={{ zIndex: "9", marginTop: "3%" }}
                        >
                          <input
                            type="Image"
                            src={`https://www.themoviedb.org/t/p/w150_and_h225_multi_faces${x.profile_path}`}
                            style={{ width: "150px", height: "230px" }}
                            className="imagebutton2"
                            onClick={() => {
                              history.push(`/peopleprofile/${x.id}`);
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
            <div style={{ marginLeft: "5%", marginTop: "2%" }}>
              <a
                className="icon-facebook"
                style={{ color: "pink", margin: "1%", fontSize: "40px" }}
                href={`http://www.facebook.com/${links.facebook_id}`}
              ></a>
              <a
                className="icon-twitter"
                style={{ color: "pink", margin: "1%", fontSize: "40px" }}
                href={`http://www.twitter.com/${links.twitter_id}`}
              ></a>
              <a
                className="icon-instagram"
                style={{ color: "pink", margin: "1%", fontSize: "40px" }}
                href={`http://www.instagram.com/${links.instagram_id}`}
              ></a>
            </div>

            <div
              style={{
                width: "80%",
                height: "20vh",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginLeft: "7%", marginTop: "1%" }}>
                <p className="status">Status:</p>
                <p className="statusval">{movieData.status}</p>
              </div>
              <div>
                <p className="status">Budget: </p>
                <p className="statusval">
                  ${parseInt(movieData.budget).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="status">Revenue:</p>
                <p className="statusval">
                  ${parseInt(movieData.revenue).toLocaleString()}
                </p>
              </div>
            </div>
            <Modal show={isOpen} onHide={hideModal} size="xl">
              <iframe
                width="100%"
                height="700px"
                src={`https://www.youtube.com/embed/${query}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </Modal>
          </div>
        </div>
       </>
       ) : (
        <Loader />
      )}
    </div>
  );
}

export default Profile;
