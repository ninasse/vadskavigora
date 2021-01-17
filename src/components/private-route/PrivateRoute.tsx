import React, { useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect, Route} from 'react-router-dom';

export default function PrivateRoute({component: Admin, ...rest}: any) {
    const authContext = useContext(AuthContext);
    const user = authContext.user;
    const [loggedInUser, setLoggedInUser]: any = useState(user)
    console.log('USER -->', user);

    useEffect(() => {
        setLoggedInUser(user)
    }, [user]);

    return (
        <Route {...rest}
        render={props => 
           loggedInUser ? <Admin {...props}/> : <Redirect to='/log-in' />   
        } />   
    )
}
