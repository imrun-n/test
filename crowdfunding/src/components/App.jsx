import React, { createContext, useReducer } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import Profile from './Profile';
import Explore from './Explore'
import StartACampaign from './StartACampaign'
import NewPassword from './NewPassword'
import Navbar from './Navbar'
import Footer from './Footer'
import ResetPass from './ResetPass'
import CampaignDetails from './CampaignDetails'
import Payment from './Payment'
//import Navigation from './Navigation'
import WhatWeDo from './WhatWeDo'
import '../App.css'
import Logout from './Logout'
import { initialState, reducer } from '../reducer/UseReducer'



import { Redirect, Route, Switch } from 'react-router';

export const UserContext = createContext();


const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/explore/:type" component={Explore} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/what-we-do" component={WhatWeDo} />
            <Route exact path="/reset-pass" component={ResetPass} />
            <Route exact path="/new-password/:token" component={NewPassword} />

            <Route exact path="/start-a-campaign" component={StartACampaign} />
            <Route exact path="/camp-details/:id" component={CampaignDetails} />
            <Route exact path="/camp-details/:id/payment" component={Payment} />

            <Redirect to="/" />
        </Switch>

    )
}

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            <UserContext.Provider value={{ state, dispatch }}>

                <Navbar />
                <Routing />
                <Footer />

            </UserContext.Provider>

        </>

    );
};


export default App;
