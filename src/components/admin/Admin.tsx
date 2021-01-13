
import React, { useContext, useState } from 'react';
import firebase , {auth} from './../../../src/firebase';
import {useHistory} from 'react-router-dom';
import Activity from '../../models/Activity';
import AddActivity from '../add-activity/AddActivity';
import Suggestions from './../suggestions/Suggestions';
import {AuthContext} from '../../contexts/AuthContext';
import './Admin.scss';

export default function Admin(){
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const [activity, setActivity] = useState(new Activity());
    const [isSaved, setIsSaved] = useState(false);
    const [currentUser, setCurrentUser] = useState(authContext.user);
    const db = firebase.firestore();
    const userEmail = authContext.user?.email;
    
    console.log(isSaved);
    console.log(authContext.user?.email);
    function saveActivity(act: Activity, created: boolean) {
        setActivity(act);
        setIsSaved(created);
    }
      
    function addToDB() {
        console.log(activity);
        db.collection('activities').add(activity);  
         
    }

    function signOut(){
        auth.signOut().then(res => {
             setCurrentUser(null)
             history.push('/log-in');
        })
     } 

     
    
    if(isSaved ) {
        addToDB(); 
        setIsSaved(false);
        console.log('SPARAR!!')
    }

       
    
    return (
        <React.Fragment>
           {currentUser ? <div>
            <div>Inloggad som: {userEmail}</div>
            <button type='button' id='adminSignOutButton' onClick={signOut}>Logga ut</button>
            </div> : null} 
        <AddActivity addActivity={saveActivity}></AddActivity>
        <Suggestions></Suggestions>
        </React.Fragment>
    )
}