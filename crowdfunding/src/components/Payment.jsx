import React, { useEffect, useState } from 'react';
//import { Route } from 'react-router';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './CampaignDetails.css';
import './payment.css'
import './Discussion.css';
import StripeCheckout from "react-stripe-checkout";


const Payment = () => {

    const { id } = useParams();
    const history = useHistory();
    const [userData, setuserData] = useState({});
    const [project, setProject] = useState({});
    const [backamount, setBackamaount] = useState("");
    let data, data1;

    const [name1, setName] = useState("");
    const [price, setPrice] = useState("");
    const [productBy, setProductBy] = useState("");
    const [backer, setBacker] = useState("");


    const calluserdataretrive = async () => {
        try {
            const res = await fetch('/what-we-do', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"

            });

            const res1 = await fetch(`/projectdetails/${id}/payment`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"


            });


            data = await res.json();
            console.log(data);
            setuserData(data);
            setBacker(userData._id)
            console.log(userData);
            console.log(userData.email);
            if (res.status === 401) {
                const error = new Error(res.error);
                throw error;
            }
            data1 = await res1.json();
            console.log(data1)
            setProject(data1.myProject)
            setName(project._id)
            setPrice(project.amount)
            //setProductBy(project.postedBy._id)
            console.log(project)

        } catch (err) {
            console.log(err);
            history.push('/login');
        }

    }

    useEffect(() => {
        calluserdataretrive();

    }, []);








    const makePayment = token => {
        const body = {
            token, name1, price, backer, backamount
        };
        const headers = {
            "Content-Type": "application/json"
        };

        return fetch(`/payment1`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log("RESPONSE ", response);
                const { status } = response;
                console.log("STATUS ", status);
            })
            .catch(error => console.log(error));
    };


    return (
        <>
            {project ? <div className="container" style={{ height: "100vh" }}>
                <div className="row justify-content-center">
                    <div className="top-div" id="part">
                        <div className="left-div" style={{ marginTop: "80px", float: "left" }}>
                            <span>YOU ARE CONTRIBUTING TO</span>
                            <h3>{project.ctitle}</h3>

                            <div>
                                <img style={{ width: "80px", height: "80px", borderRadius: "40px", marginRight: "15px" }}
                                    src="https://picsum.photos/100"
                                />
                            </div>
                            <div>
                                <span id="user-name">{userData.name}</span>
                                <p>backer </p>
                                <span id="user-name">{userData.email}</span>


                            </div>

                        </div>

                        <div className="top-div">
                            <div>
                                <input type="number" name="bamount" onChange={(e) => { setBackamaount(e.target.value) }} placeholder="Amount" />
                            </div>
                            <StripeCheckout
                                stripeKey="pk_test_51J6aoDKc0TZv9NwKZZSNcS3gVZ1MwVfm6VKsOo5OCxup4GQjNHXwlZAAK4GQr7QFmtiX8spQdkuqOzeTo5USbSM400IWNwUBtU"
                                token={makePayment}
                                name="Buy React"
                                amount={backamount * 100}
                            /* shippingAddress
                            billingAddress */
                            >
                                <button className="btn-large blue">
                                    Payment
                                </button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>
                : <h5>Lodding</h5>}

        </>
    );
};

export default Payment;