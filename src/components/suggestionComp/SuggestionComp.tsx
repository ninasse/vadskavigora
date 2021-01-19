import React, { useState } from 'react';
import './SuggestionComp.scss';
import AddSuggestion from '../add-suggestion/AddSuggestion';
import Suggestion from '../../models/Suggestion';
import { Link } from 'react-router-dom';
import HeaderText from '../headerText/headerText';

export default function SuggestionComp(){

    const [isSaved, setIsSaved] = useState(false);
  
    function saveSuggestion(act: Suggestion, created:boolean) {
        setIsSaved(created);
    }

    if(isSaved) { 
        setIsSaved(false);
    }

    return(
        <>
        <HeaderText/>
            <div>
                <div className="goBack">
                <Link to="/"><button>Tillbaka</button></Link>
                </div>
            </div>
            <div id="suggestionComp">
                
                <AddSuggestion addSuggestion={saveSuggestion}></AddSuggestion>
            </div>
        </>    
    )
}