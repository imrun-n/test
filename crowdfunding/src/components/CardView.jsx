import React from 'react';
import './StartACampaign.css';
import { NavLink, useHistory } from 'react-router-dom';
import CampaignDetails from './CampaignDetails';
const CardView = (props) => {


    return (
        <div className="card" style={{ "width": "22rem", height: "500px" }}>
            <img src={props.item.url} className="card-img-top" alt="..." height="200px" />
            <div className="card-body d-flex flex-column" id="card-text">
                <div>
                    <h5 className="card-title">{props.item.ctitle}</h5>
                    <p>{props.item.ctagline}</p>
                </div>
                <div className="category">
                    <span style={{ color: "#ff00ff" }}>{props.item.category}</span>

                </div>

                <div className="progress" id="progressbar">
                    <div className="progress-bar bg-success" role="progressbar" style={{ "width": "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
                <a href={"/camp-details/" + props.item._id} className="btn card-button align-self-end mt-auto"> View Details</a>

            </div>
        </div>
    );
}

export default CardView;

