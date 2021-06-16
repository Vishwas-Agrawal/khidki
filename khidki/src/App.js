import React from 'react';
import Homepage from './components/Homepage';
import Search from './components/Search';
import Login from "./components/Login"
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import People from './components/People/People';
import Peopleprofile from "./components/People/Peopleprofile"
import Signup from "./components/Signup"
import Movies from './components/Movies/Movies'
import Moviesprofile from './components/Movies/Movieprofile'
import UserProfile from './components/User/UserProfile'
import Shows from './components/Tvshows/Shows'
import ShowProfile from './components/Tvshows/Showprofile'
import Emailconfirm from './components/Emailconfirm'
export default function App()
{
    return (  
        <Router>
            <Switch>   
                 <Route exact path='/login' component={Login}/>             
                 <Route exact path='/search/:id' component={Search}/>
                 <Route exact path='/' component={Homepage}/>
                 <Route exact path='/people/:id' component={People}/>
                 <Route exact path="/peopleprofile/:id" component ={Peopleprofile}/>
                 <Route exact path="/signup" component={Signup}/>
                 <Route exact path="/movie/:id" component={Movies}/>
                 <Route exact path="/movieprofile/:id" component={Moviesprofile}/>
                 <Route exact path ='/user/:id' component={UserProfile}/>
                 <Route exact path="/show/:id" component={Shows}/>
                 <Route exact path="/showprofile/:id" component={ShowProfile}/>
                 <Route exact path="/showprofile/:id" component={ShowProfile}/>
                 <Route exact path="/confirmation/:id" component={Emailconfirm}/>
                 
            </Switch>
        </Router>
  
    )
}
