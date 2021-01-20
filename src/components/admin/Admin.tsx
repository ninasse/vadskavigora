
import React, { useContext, useEffect, useState } from 'react';
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
    // eslint-disable-next-line
    const [isSelected, setIsSelected] = useState(false);

    const userEmail = auth.currentUser?.email;
  
    function saveActivity(act: Activity, created: boolean) {
        setActivity(act);
        setIsSaved(created);
    }
      
    function addToDB() {
        db.collection('activities').add(activity);
        setIsSaved(false);    
    }

    function signOut(){
        auth.signOut().then(res => {
             setCurrentUser(null)
             history.push('/log-in');
        })
     } 

    function setSelected(clicked : boolean){
        setIsSelected(clicked);
    }

    useEffect(() => {
        if(isSaved ) {
            addToDB(); 
        }
        setIsSaved(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaved]);

    return (
        <React.Fragment>
           <div>
           {currentUser ? <div>
            <div>Inloggad som: {userEmail}</div>
            <button type='button' id='adminSignOutButton' onClick={signOut}>Logga ut</button>
            </div> : null} 
        <AddActivity addActivity={saveActivity}></AddActivity>
        <Suggestions suggestionSelected ={setSelected}></Suggestions>
         </div>
        </React.Fragment>
    )
}