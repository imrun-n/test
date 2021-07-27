import React, { useEffect, useState } from 'react';
import {DatePickerComponent} from "@syncfusion/ej2-react-calendars";

//import { Route } from 'react-router';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import './Profile.css'


const Profile = () => {
    



    return (
        <>

            <div className="container border" id="whole">
                <div className="row justify-content-center">
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px", marginTop: "40px" }}
                            src="https://picsum.photos/100" />
                    </div>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label  className="form-label">Username</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" />
                        </div>
                        
                        <div className="col-md-6">
                            <DatePickerComponent placeholder="Birthday (mm/dd/yyyy)"></DatePickerComponent>
                        </div>
                        <div className="col-12">
                            <label for="inputAddress" className="form-label">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                        </div>
                        <div className="col-12">
                            <label for="inputAddress2" className="form-label">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">City</label>
                            <input type="text" className="form-control" id="inputCity" />
                        </div>
                        <div className="col-md-4">
                            <label for="inputState" className="form-label">Country</label>
                            <select id="inputState" className="form-select">
                                <option selected>Choose...</option>
                                <option>Afghanistan</option>
                                <option>Albania</option>
                                <option>Algeria</option>
                                <option>Andorra</option>
                                <option>Angola</option>
                                <option>Antigua and Barbuda</option>
                                <option>Argentina</option>
                                <option>Armenia</option>
                                <option>Australia</option>
                                <option>Austria</option>
                                <option>Azerbaijan</option>
                                <option>Bahamas</option>
                                <option>Bahrain</option>
                                <option>Bangladesh</option>
                                <option>Barbados</option>
                                <option>Belarus</option>
                                <option>Belgium</option>
                                <option>Belize</option>
                                <option>Benin</option>
                                <option>Bhutan</option>
                                <option>Bolivia</option>
                                <option>Bosnia and Herzegovina</option>
                                <option>Botswana</option>
                                <option>Brazil</option>
                                <option>Britain</option>
                                <option>Brunei</option>
                                <option>Bulgaria</option>
                                <option>Burkina Faso</option>
                                <option>Burma</option>
                                <option>Burundi</option>
                                <option>Cambodia</option>
                                <option>Cameroon</option>
                                <option>Canada</option>
                                <option>Cabo Verde</option>
                                <option>Central African Republic</option>
                                <option>Chad</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label for="inputZip" className="form-label">Zip</label>
                            <input type="text" className="form-control" id="inputZip" />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" />
                        </div>
                        
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>

            </div>



        </>
    );

}

export default Profile;