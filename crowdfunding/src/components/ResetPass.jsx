import React, { useState, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
//import GoogleLogin from 'react-google-login';
import { UserContext } from './App';

const ResetPass = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");


    const SubmitForm = async (e) => {
        e.preventDefault();

        // const newEntry = { email, password };
        // setAllEntry([...allEntry, newEntry]);
        // console.log(allEntry);
        // setEmail("");
        // setPassword("");
        try {

            const res = await fetch("/reset-pass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email

                })


            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                window.alert(data.error);
                //console.log("Invalid credential");
            } else {

                window.alert("reset pass link sen to email");
                console.log("reset pass link sen to email");
                history.push("/login");

            }

        } catch (err) {
            console.log(err);
        }





    }



    return (
        <>
            <div className="login-form">
                <form method="post">
                    <h2 className="text-center">Reset Password</h2>
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
                        <button type="submit" onClick={SubmitForm} className="btn btn-primary login-btn btn-block">Reset Pass</button>
                    </div>


                </form>

            </div>
        </>
    );
};

export default ResetPass;