import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from './App';
import CardView from './CardView';

import M from 'materialize-css'

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const [search, setSearch] = useState('')
    const [projectDetails, setProjectDetails] = useState([])
    const searchModal = useRef(null)

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <li className="nav-item "><NavLink aria-current="page" to="/" className="nav-link active"></NavLink></li>
                    {/* <li className="nav-item"><NavLink to="/what-we-do" className="nav-link">What We Do</NavLink></li> */}
                    <li className="nav-item"><NavLink to="/start-a-campaign" className="nav-link" style={{ fontFamily: "montserrat", fontSize: "20px", letterSpacing: "1px" }}>
                        Start a Campaign</NavLink></li>
                    <li className="nav-item"><NavLink to="/logout" className="nav-link" style={{ fontFamily: "montserrat", fontSize: "20px", letterSpacing: "1px" }}>
                        Logout</NavLink></li>

                </>
            )
        }
        else {
            return (
                <>
                    <li className="nav-item "><NavLink aria-current="page" to="/" className="nav-link active"></NavLink></li>
                    {/* <li className="nav-item"><NavLink to="/what-we-do" className="nav-link">What We Do</NavLink></li> */}
                    <li className="nav-item"><NavLink to="/start-a-campaign" className="nav-link text-design" style={{ fontFamily: "montserrat", fontSize: "20px", letterSpacing: "1px" }}>
                        Start a Campaign</NavLink></li>


                    <li className="nav-item"><NavLink to="/login" className="nav-link text-design" style={{ fontFamily: "montserrat", fontSize: "20px", letterSpacing: "1px" }}>
                        Login</NavLink></li>
                    <li className="nav-item"><NavLink to="/signup" className="nav-link text-design" style={{ fontFamily: "montserrat", fontSize: "20px", letterSpacing: "1px" }}>
                        Sign Up</NavLink></li>

                </>
            )
        }
    }



    const fetchProject = (query) => {
        setSearch(query)
        fetch('/search-project', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(results => {
                setProjectDetails(results.project)
                console.log(results.project)
                console.log(projectDetails)
            })
    }


    useEffect(() => {
        M.Modal.init(searchModal.current)
    }, []);


    const clearmethod = () => {
        setSearch('');
        setProjectDetails([]);
    }





    return (
        <>
            <div clasName="container-fluid nav_bg" id="nav">
                <div className="row">
                    <div className="col-12 mx-auto">

                        <nav className="navbar navbar-expand-lg bg-dark fixed-top" id="ftco-navbar">
                            <div className="container-fluid">
                                <NavLink className="navbar-brand" to="/" style={{ fontFamily: "montserrat", fontSize: "22px", letterSpacing: "1px" }}>
                                    Crowdfunding

                                </NavLink>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="oi oi-menu text-design" style={{ fontFamily: "montserrat", fontSize: "20px", letterSpacing: "1px" }}></span> Menu
                                </button>

                                <div className="collapse navbar-collapse" id="ftco-nav">


                                    <i data-target="modal1" className="large material-icons modal-trigger" style={{ marginLeft: "10px" }}>search</i>


                                    <ul className="navbar-nav ml-auto">

                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle text-design" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false" style={{ fontFamily: "montserrat", fontSize: "20px", letterSpacing: "1px" }}>
                                                Explore
                                            </a>

                                            <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown" >
                                                <li><a className="dropdown-item text-design" href="/explore">Tech & Innovation</a></li>
                                                <li><a className="dropdown-item text-design" href="/explore">Creative Work</a></li>
                                                <li><hr className="dropdown-divider text-design" /></li>
                                                <li><a className="dropdown-item text-design" href="/explore">Community Project</a></li>
                                            </ul>
                                        </li>

                                        <RenderMenu />







                                    </ul>
                                </div>
                            </div>
                            <div id="modal1" class="modal" ref={searchModal} style={{ color: "black", width: "500px", maxHeight: " 500px", overflowY: "auto" }}>
                                <div className="modal-content">
                                    <input
                                        type="text"
                                        placeholder="search projects"
                                        value={search}
                                        onChange={(e) => fetchProject(e.target.value)}
                                    />

                                    <ul className="collection">

                                        {
                                            projectDetails.map(item => {
                                                return (
                                                    <>

                                                        <li class="collection-item avatar">

                                                            <CardView item={item} />
                                                        </li>

                                                    </>

                                                )
                                            })
                                        }

                                    </ul>

                                </div>
                                <div className="modal-footer">
                                    <button className="modal-close waves-effect waves-green btn-flat" onClick={clearmethod} style={{ fontFamily: "montserrat", fontSize: "25px", letterSpacing: "1px" }}>close</button>
                                </div>
                            </div>


                        </nav>



                    </div>
                </div>
            </div>



        </>
    );
};


export default Navbar;