
import React from 'react';
import { Link } from 'react-router-dom';
import Suggestions from './../suggestions/Suggestions';
import './Admin.scss';

export default function Admin(){
    return (
        <React.Fragment>
        <h1>Admin works!</h1>

        <Suggestions></Suggestions>
        </React.Fragment>
    )
}