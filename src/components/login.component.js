import React, {Component} from "react";
import Axios from 'axios';


Axios.defaults.withCredentials=true;

export default class Login extends Component {
    constructor(props2) {
        super(props2);
        this.state = {
            emailLog: '',
            passwordLog: '',
            loginStatus:''
        };
    }

    render() {

        const login = () => {
            this.state.loginStatus = 123;
            Axios.post('http://localhost:3001/login', {
                email: this.state.emailLog,
                password: this.state.passwordLog
            }).then((response) => {
                if(response.data.message){
                    this.state.loginStatus = response.data.message;
                }else{
                    this.state.loginStatus = response.data[0].email;
                }
            })
        }



        return (
            <form className={"auth-inner"}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                           onChange={(e) => {
                               this.state.emailLog = e.target.value;
                           }}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           onChange={(e) => {
                               this.state.passwordLog = e.target.value;
                           }}
                    />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={login}>Login</button>

                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>

                <h1>{this.state.loginStatus}</h1>

            </form>
        );
    }
}
