import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
//import GoogleLogin from 'react-google-login';
import { UserContext } from './App';

const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [allEntry, setAllEntry] = useState([]);

    const SubmitForm = async (e) => {
        e.preventDefault();

        // const newEntry = { email, password };
        // setAllEntry([...allEntry, newEntry]);
        // console.log(allEntry);
        // setEmail("");
        // setPassword("");
        try {

            const res = await fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password

                })


            });
            const data = await res.json();
            if (res.status === 400 || !data) {
                window.alert("Invalid credential");
                console.log("Invalid credential");
            } else {
                dispatch({ type: "USER1", payload: true });
                window.alert("login successful");
                console.log("login successful");
                history.push("/");

            }

        } catch (err) {
            console.log(err);
        }





    }



    return (
        <>
            <div className="login-form">
                <form method="post">
                    <h2 className="text-center">Log in</h2>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <span className="fa fa-user"></span>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" onClick={SubmitForm} className="btn btn-primary login-btn btn-block">Log in</button>
                    </div>
                    <div className="clearfix">

                        <NavLink to="/reset-pass" className="float-right">Forgot Password?</NavLink>
                    </div>
                    <div className="or-seperator"><i>or</i></div>
                    <p className="text-center">Login with your social media account</p>
                    <div className="text-center social-btn">
                        <NavLink to="/" className="btn btn-secondary"><i className="fa fa-facebook"></i>&nbsp; Facebook</NavLink>
                        <NavLink to="/" className="btn btn-info"><i className="fa fa-twitter"></i>&nbsp; Twitter</NavLink>
                        <NavLink to="/" className="btn btn-danger"><i className="fa fa-google"></i>&nbsp; Google</NavLink>
                    </div>
                </form>
                <p className="text-center text-muted small">Don't have an account? <NavLink to="/signup">Sign up here!</NavLink></p>
            </div>
        </>
    );
};

export default Login;