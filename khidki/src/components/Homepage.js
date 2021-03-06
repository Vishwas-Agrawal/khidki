import React, { useEffect, useState } from 'react';
import CustomNavbar from "./CustomNavbar";
import Footer from './Footer';
import Galbackground from "./Galbackground";
import Horizontaldiv from "./Horizontaldiv"
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function Homepage() {
    let history = useHistory();
    const [movieData, setMovieData] = useState([]);
    const apiii = async () => {
        try {
       
          const Mdata = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=7372ae765660f35a9b2e71883bb705a5`
          );
          setMovieData(Mdata.data.results);
         
        } catch (err) {
          console.log(err.message);
        }
      };
      useEffect(() => {
        apiii();
      }, []);
    return (
        <div style={{width: "100%", height:"100% ",backgroundColor: "black"}}>
            <CustomNavbar/>
            <Galbackground/> 
            <Horizontaldiv></Horizontaldiv>  
            <h2 style={{marginLeft:"5%",color:"white"}}>Trending</h2>
            <div style={{marginLeft:"5%",marginRight:"4%",background:`url("https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg")`,backgroundRepeat:"no-repeat",height:"45vh",backgroundPosition:"bottom"}}>
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
                          style={{ fontSize: "15px", color: "white" }}
                        >
                          {x.title.slice(0,15)+"..."}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>            
            </div>
            <Footer/> 
                    
        </div>
    )
}
