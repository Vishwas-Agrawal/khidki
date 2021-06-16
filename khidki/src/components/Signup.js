import React, { useState, useEffect } from "react";
import pic from "../Assests/login.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import createBrowserHistory from "history/createBrowserHistory";
import M from "materialize-css";

export default function Signup() {
  const history = createBrowserHistory({ forceRefresh: true });
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [about, setAbout] = useState("");
  const PostData = () => {
    if (password.length < 8) {
      alert("Password should be atleast of length 8");
      history.push("/signup");
      return;
    }
     
    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
     
      alert("You have entered an invalid email address!");
      return;
    }

    fetch("/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
        mobileNo,
        country,
        gender,
        birthday,
        about,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
         alert(data.error);
        } else {
          history.push("/login");
        }
      });
  };
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
              <img src={pic} alt="Image" className="img-fluid" />
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
                      SignUP{" "}
                    </h3>
                  </div>
                  <form>
                    <div
                      className="form-group first"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="text"
                        placeholder="Username"
                        className="form-control"
                        id="username"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div
                      className="form-group first"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                        id="email"
                        value={email}
                        pattern="[a-zA-Z]{3,}@[a-zA-Z]{3,}[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,}"
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
                    <div
                      className="form-group first"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        className="form-control"
                        pattern="^\d{3}-\d{3}-\d{4}$"
                        id="mobileNo"
                        value={mobileNo}
                        onChange={(e) => {
                          setMobileNo(e.target.value);
                        }}
                      />
                    </div>
                    <div
                      className="form-group first"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="text"
                        placeholder="Country"
                        className="form-control"
                        id="country"
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      />
                    </div>
                    <div
                      className="form-group first"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="text"
                        placeholder="Gender"
                        className="form-control"
                        id="gender"                        
                        list="browsers"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      />
                      <datalist id="browsers">
                        <option value="Male"/>
                        <option value="Female"/>
                        
                      </datalist>
                    </div>
                    <div
                      className="form-group first"
                      style={{ margin: "5%", padding: "0%" }}
                    >
                      <input
                        type="date"
                        className="form-control"
                        id="birthday"
                        value={birthday}
                        onChange={(e) => {
                          setBirthday(e.target.value);
                        }}
                      />
                    </div>

                    <input
                      type="button"
                      value="Signup"
                      className="btn btn-block btn-primary"
                      style={{ backgroundColor: "#6c63ff" }}
                      onClick={() => PostData()}
                    />
                    <span className="d-block text-left my-4 text-muted">
                      — or login with —
                    </span>
                    <div className="social-login ">
                      <a href="#" className="facebook m-2">
                        <span className="icon-facebook mr-3"></span>
                      </a>
                      <a href="#" className="twitter m-2">
                        <span className="icon-twitter mr-3"></span>
                      </a>
                      <a href="#" className="google m-2">
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
