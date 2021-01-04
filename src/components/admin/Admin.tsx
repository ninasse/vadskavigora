
import React, { useState } from 'react';
import firebase from './../../../src/firebase';
import Activity from '../../models/Activity';
import AddActivity from '../add-activity/AddActivity';
import Suggestions from './../suggestions/Suggestions';
import './Admin.scss';

export default function Admin(){

    const [activity, setActivity] = useState(new Activity());
    const [isSaved, setIsSaved] = useState(false);
    const db = firebase.firestore();

    console.log(isSaved);
    function saveActivity(act: Activity, created: boolean) {
        setActivity(act);
        setIsSaved(created);
    }
      
    function addToDB() {
        console.log(activity);
        db.collection('activities').add(activity);  
    }
    
    if(isSaved) {
        addToDB(); 
        setIsSaved(false);  
        console.log('SPARAR!!')
    }

    return (
        <React.Fragment>
        <AddActivity addActivity={saveActivity}></AddActivity>
        <Suggestions></Suggestions>
        </React.Fragment>
    )
}