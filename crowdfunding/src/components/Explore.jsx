import React, { useEffect, useState } from 'react';
//import { Route } from 'react-router';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import './CampaignDetails.css';
import './Discussion.css';


const Explore = () => {



    const [projectProfile, setProjectProfile] = useState([]);
    const { type } = useParams();

    const history = useHistory();




    const callexplorepage = async () => {

        fetch(`/projectdetails/${type}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }
        ).then(res => res.json())
            .then(result => {
                console.log(result)


                setProjectProfile(result)
                console.log(projectProfile)
            })
    }



    useEffect(() => {
        callexplorepage();

    }, []);


    return (
        <>
            <h1>hello</h1>

        </>
    );
};

export default Explore;