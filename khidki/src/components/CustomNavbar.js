import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../redux/actions/actions";
import { signout } from "../redux/actions/actions"
import {useHistory} from 'react-router-dom';

export default function CustomNavbar() {
  const history = useHistory();
  const dispatch = useDispatch();  
  const Condition = () => {
    dispatch(signin());
    const temp = useSelector((state) => {
      return state.name;
    });
    const _id = useSelector((state)=>{
      return state._id;
    })
    console.log(temp);
    if (temp === "") {
      return (
        <>
          <Nav.Link
            style={{ color: "black", fontWeight: "bold" }}
            href="/login"
          >
            Login
          </Nav.Link>
          <Nav.Link
            style={{ color: "black", fontWeight: "bold" }}
            eventKey={2}
            href="/signup"
          >
            SignUp
          </Nav.Link>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link 
              style={{ color: "black", fontWeight: "bold" }}                
              onClick={()=>history.push(`/user/${_id}`)}      
          >
            {temp}
          </Nav.Link>
          <Nav.Link style={{ color: "black", fontWeight: "bold" }} onClick={()=>{dispatch(signout()); history.push('/')}}>
           SignOut
          </Nav.Link>
        </>
      );
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="color-nav" variant="dark">
      <Navbar.Brand
        href="/"
        style={{
          color: "black",
          fontFamily: "Lato, sans-serif",
          fontWeight: "bolder",
          fontSize: "1.5rem",
        }}
      >
        KHIDKI
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto ">
          <NavDropdown title="Movies" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/movie/1">Popular</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Now Playing</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Upcoming</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.4">Top Rated</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="TVShows" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/show/1">Popular</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.2">Now Playing</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.3">ON TV</NavDropdown.Item>
            <NavDropdown.Item href="#action/4.4">Top Rated</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link
            style={{ color: "black", fontWeight: "bold" }}
            href="/people/1"
          >
            People
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link
            style={{ color: "black", fontWeight: "bold" }}
            href="/search/avenger"
          >
            <NotificationsIcon></NotificationsIcon>
          </Nav.Link>
          <Condition />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
