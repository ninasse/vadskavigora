import React, { useState } from 'react';
import './SuggestionComp.scss';
import AddSuggestion from '../add-suggestion/AddSuggestion';
import Suggestion from '../../models/Suggestion';
import firebase from './../../../src/firebase';



export default function SuggestionComp(){

     const [suggestion, setSuggestion]= useState(new Suggestion());

    const [isSaved, setIsSaved] = useState(false);
    const db = firebase.database();

    console.log(isSaved);
     function saveSuggestion(act: Suggestion, created:boolean) {
         setSuggestion(act);
         setIsSaved(created);
         }

    function addToDB(){
        console.log(suggestion);
        db.ref('Suggestion').push(suggestion);
        
    }
    
    if(isSaved) {
        addToDB();
        setIsSaved(false);
        console.log("SPARAR");
    }

    
    return(
        <React.Fragment>
        <h1>Suggestion Comp!</h1>
        <AddSuggestion addSuggestion={saveSuggestion}></AddSuggestion>

        </React.Fragment>
        
    )
}