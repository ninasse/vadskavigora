import React, { useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Redirect, Route} from 'react-router-dom';

export default function PrivateRoute({component: Admin, ...rest}: any) {
    const authContext = useContext(AuthContext);
    const currentUser = authContext.user;
    const isLoading = authContext.isLoading;

   if(isLoading) return <div>Loggar in...</div>;

    return (
        <Route {...rest}
        render={props => 
           currentUser ? <Admin {...props}/> : <Redirect to='/log-in' />   
        } />   
    )
}
