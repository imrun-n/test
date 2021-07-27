import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './App';
const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        fetch('/logout', {
            method: "GET",
            headers: {
                Accept: "appllication/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({ type: "USER1", payload: false });
            history.push('/', { replace: true });

            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }

        }).catch((err) => {
            console.log(err);
        });
    });
    return (
        <>

        </>
    )
}

export default Logout;
