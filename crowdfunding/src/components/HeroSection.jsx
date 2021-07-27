import React from 'react';
import '../App.css';
import './HeroSection.css';
import homeimage1 from '../carousel/homeimage1.jpeg';
import homeimage2 from '../carousel/homeimage2.jpg';
import homeimage3 from '../carousel/homeimage3.jpg';


const HeroSection = () => {
    return (
        <div className="hero-container">
            <img src={homeimage3} className="d-block w-100" alt="..." />
            <h1>BRING YOUR PROJECT TO LIFE</h1>
            <p>What are you waiting for?</p>
        </div>
        /*  <div id="carouselExampleInterval" className="carousel slide hero-container" data-bs-ride="carousel">
             <div className="carousel-inner">
                 <div className="carousel-item active" data-bs-interval="1000">
                     <img src={homeimage1} className="d-block w-100" alt="..." />
                 </div>
                 <div className="carousel-item" data-bs-interval="2000">
                     <img src={homeimage2} className="d-block w-100" alt="..." />
                 </div>
                 <div className="carousel-item">
                     <img src={homeimage3} className="d-block w-100" alt="..." />
                 </div>
             </div>
             <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                 <span className="visually-hidden">Previous</span>
             </button>
             <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
                 <span className="visually-hidden">Next</span>
             </button>
         </div> */
    );
}

export default HeroSection;

