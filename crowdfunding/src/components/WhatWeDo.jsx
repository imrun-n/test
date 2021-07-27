import React, { useEffect, useState } from 'react';
//import { Route } from 'react-router';
import { useHistory } from 'react-router-dom';
import tumpa from '../images/tumpa.jpeg';



const WhatWeDo = () => {
    const history = useHistory();
    const [userData, setuserData] = useState({});
    let data;

    const callWhatWeDoPage = async () => {
        try {
            const res = await fetch('/what-we-do', {
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
            console.log(userData);
            console.log(userData.email);
            //console.log("what we do ");
            //console.log(data);
            if (res.status === 401) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
            history.push('/login');
        }

    }

    useEffect(() => {
        callWhatWeDoPage();

    }, []);

    return (
        <>


            <form method="GET">
                <div className="row ">
                    <div className="col-4">


                    </div>
                    <div className="col-6">
                        <h5>{userData.email}</h5>
                    </div>

                </div>
            </form>



        </>
    );
};

export default WhatWeDo;