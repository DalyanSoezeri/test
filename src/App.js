import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Axios from 'axios';

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Homepage from "./components/homepage.component";
import Profile from "./components/profile.component";
import Footer from './components/footer.components'

function App() {

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if (response.data.loggedIn === true) {
                Login.constructor(this.loginStatus = response.data.user[0].username)
            }
        })
    }, [])




    return (
        <Router>
           
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/homepage"}>TutorHub Lernplattform</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02" className="align-item">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/profile"}>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-in"}>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                </li>
                                <li className="nav-item">

                                </li>
                            </ul>
                        </div>
                    </div>

                </nav>

                <div className="auth-wrapper">
                    <div>
                        <Switch>
                            <Route exact path='/' component={Login} />
                            <Route path="/sign-in" component={Login} />
                            <Route path="/homepage" component={Homepage} />
                            <Route path="/sign-up" component={SignUp} />
                            <Route path="/profile" component={Profile} />
                        </Switch>
                    </div>
                </div>
            </div>
            <Footer />
            
        </Router>

    );
}

export default App;
