import React, {useState} from "react";
import pic from "../Assests/login.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import {useHistory} from 'react-router-dom'
import "./login.css";
import {useDispatch} from 'react-redux';
import {signin} from '../redux/actions/actions'
export default function Login() {
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const history = useHistory();
  const dispatch = useDispatch(); 
  const GetData=()=>{    
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({     
        password: password,
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
         console.log(data.error);
        } else {
          console.log("hello");
          if(data.user.isVerified==false){
            alert("Please verify the Email");
            return;
          }
          else{
         localStorage.setItem("jwt",data.token);
         localStorage.setItem("user",JSON.stringify(data.user));
        dispatch(signin()); 
               
        history.push('/');
        }
      }
      }).catch(err=>console.log(err));
  }
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100%",
        top: "0",
        left: "0",
        position: "fixed",
        width: "100%",
      }}
    >
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img src={pic} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6 contents">
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h3
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Lato",
                        fontWeight: "bold",
                      }}
                    >
                      LogIn
                    </h3>
                  </div>
                  <form >
                    <div
                      className="form-group first"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="text"
                        placeholder="Email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}

                      />
                    </div>
                    <div
                      className="form-group last"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    
                    <input
                      type="button"
                      value="Log In"
                      className="btn btn-block btn-primary"
                      style={{ backgroundColor: "#6c63ff" }}
                      onClick={() => GetData()}
                    />
                    <span className="d-block text-left my-4 text-muted">
                      — or login with —
                    </span>
                    <div className="social-login ">
                      <a href = "#a"className="facebook m-2">
                        <span className="icon-facebook mr-3"></span>
                      </a>
                      <a href="#b"className="twitter m-2">
                        <span className="icon-twitter mr-3"></span>
                      </a>
                      <a  href="#c"className="google m-2">
                        <span className="icon-google-plus mr-4 "></span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
