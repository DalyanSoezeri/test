import React, {Component} from "react";
import Axios from 'axios';


//Axios.defaults.withCredentials=true;

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameReg: '',
            emailReg: '',
            passwordReg: ''
        };
    }

    render() {

        const register = () => {
            Axios.post('http://localhost:3001/register', {
                PIDU: 2,
                username: this.state.usernameReg,
                email: this.state.emailReg,
                password: this.state.passwordReg
            }).then((response) => {
                console.log(response);
            }).catch(e => {
                console.log(e)
            })
        }

        return (
            <form className={"auth-inner"}>
                <h3>Sign Up</h3>


                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Last name"
                           onChange={(e) => {
                               this.state.usernameReg = e.target.value;
                           }}
                    />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email"
                           onChange={(e) => {
                               this.state.emailReg = e.target.value;
                           }}
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password"
                           onChange={(e) => {
                               this.state.passwordReg = e.target.value;
                           }}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={register}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
        );
    }
}