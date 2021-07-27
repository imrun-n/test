import React, { useState, useContext } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
//import GoogleLogin from 'react-google-login';
import { UserContext } from './App';

const NewPassword = () => {

    const history = useHistory();
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const { token } = useParams();


    const SubmitForm = async (e) => {
        e.preventDefault();


        try {

            const res = await fetch("/new-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password, cpassword, token

                })


            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                window.alert(data.error);
                //console.log("Invalid credential");
            } else {

                window.alert("reset password successful");
                console.log("reset password successful");
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
                                    <i className="fa fa-lock"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-lock"></i>
                                    <i className="fa fa-check"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" name="cpassword" value={cpassword} onChange={(e) => setCpassword(e.target.value)} placeholder="Confirm Password" required="required" />
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

export default NewPassword;