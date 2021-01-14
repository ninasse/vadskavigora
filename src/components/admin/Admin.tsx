
import React, { useState } from 'react';
import firebase from '../../firebase';
import Activity from '../../models/Activity';
import AddActivity from '../add-activity/AddActivity';
import Suggestions from './../suggestions/Suggestions';
import './Admin.scss';

export default function Admin(){

    const [activity, setActivity] = useState(new Activity());
    const [isSaved, setIsSaved] = useState(false);
    const db = firebase.firestore();
    const [isSelected, setIsSelected] = useState(false);

    console.log(isSaved);
    function saveActivity(act: Activity, created: boolean) {
        setActivity(act);
        setIsSaved(created);
    }
      
    function addToDB() {
        console.log(activity);
        db.collection('activities').add(activity);  
         
    }
    
    if(isSaved ) {
        addToDB(); 
        setIsSaved(false);
        console.log('SPARAR!!')
    }

    function signOut(){
        firebase.auth().signOut();
    }    
    function setSelected(clicked : boolean){
        setIsSelected(clicked);
    
        console.log(isSelected);
    }
    return (
        <React.Fragment>
           <div>
            <button type='button' id='adminSignOutButton' onClick={signOut}>Logga ut</button>
            </div>
        <AddActivity addActivity={saveActivity}></AddActivity>
        <Suggestions suggestionSelected ={setSelected}></Suggestions>
         
        </React.Fragment>
    )
}