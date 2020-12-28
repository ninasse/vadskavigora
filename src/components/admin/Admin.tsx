
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from './../../../src/firebase';
import Activity from '../../models/Activity';
import AddActivity from '../add-activity/AddActivity';
import Suggestions from './../suggestions/Suggestions';
import './Admin.scss';

export default function Admin(){

    const [activity, setActivity] = useState(new Activity());
    const [isSaved, setIsSaved] = useState(false);

    function saveActivity(act: Activity) {
        setActivity(act);
        setIsSaved(true);
      }
    function addToDB() {
        console.log(activity);
       
        const db = firebase.firestore();
            
        db.collection('activities').add(activity);      
    }

    return (
        <React.Fragment>
            
        <button onClick={addToDB}>OK!</button>
        <AddActivity addActivity={saveActivity}></AddActivity>
        <Suggestions></Suggestions>
        </React.Fragment>
    )
}