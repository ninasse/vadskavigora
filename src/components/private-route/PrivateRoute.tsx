import React, { useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect, Route} from 'react-router-dom';



export default function PrivateRoute({component: Admin, ...rest}: any) {
    const authContext = useContext(AuthContext);
    const user = authContext.user;
    console.log('USER -->', user);

    return (
        <Route {...rest}
        render={props => 
           user ? <Admin {...props}/> : <Redirect to='/log-in' />   
        } />   
    )
}
