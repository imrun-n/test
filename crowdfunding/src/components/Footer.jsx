import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import './Footer.css'

const Footer = () => {

    return (
        <div className="footer-container bg-dark">

            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h4>About Us</h4>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/sign-up'>How it works</Link>

                    </div>
                    <div className="footer-link-items">
                        <h4>Contact Us</h4>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/sign-up'>How it works</Link>
                        <Link to='/sign-up'>How it works</Link>

                    </div>


                </div>

            </div>
            <section className="social-media">
                <div className="social-media-wrap">
                    <div className="footer-logo">
                        <Link to='/' className="social-logo">
                            CF<i className="fab fa-typo3" />
                        </Link>
                    </div>
                    <small className="website-rights">CF o 2021</small>
                    <div className="social-icons">
                        <Link
                            className="social-icon-link facebook"
                            to='/'
                            target='_blank'
                            aria-label="Facebook"

                        >
                            <i className="bi bi-facebook" />

                        </Link>
                        <Link
                            className="social-icon-link twitter"
                            to='/'
                            target='_blank'
                            aria-label="Twitter"

                        >
                            <i className="fab fa-twitter" />

                        </Link>



                    </div>
                </div>

            </section>


        </div>
    );


}

export default Footer;