import React, { useState } from 'react';
import './SuggestionComp.scss';
import AddSuggestion from '../add-suggestion/AddSuggestion';
import Suggestion from '../../models/Suggestion';
import firebase from './../../../src/firebase';



export default function SuggestionComp(){

     const [suggestionC, setSuggestionC]= useState(new Suggestion());

    const [isSaved, setIsSaved] = useState(false);
    const db = firebase.database();

    console.log(isSaved);
     function saveSuggestion(act: Suggestion, created:boolean) {
         setSuggestionC(act);
         setIsSaved(created);
         }

    function addToDB(){
        console.log(suggestionC);
        db.ref('Suggestion').push(suggestionC);
        
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