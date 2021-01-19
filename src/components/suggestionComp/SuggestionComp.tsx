import React, { useState } from 'react';
import './SuggestionComp.scss';
import AddSuggestion from '../add-suggestion/AddSuggestion';
import Suggestion from '../../models/Suggestion';
import { Link } from 'react-router-dom';

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
            <div>
                <div className="goBack">
                <Link to="/"><button>Tillbaka</button></Link>
                </div>
            </div>
            <div id="suggestionComp">
                <span id="suggestionSeo">
                    Hjälp oss att fylla på databasen med massor av roliga aktiviteter som andra föräldrar kan ta del av. I en tid av vabb och brist på ider är det kanske just din aktivitet som ger glädje åt andra barn. 
                </span>
                <AddSuggestion addSuggestion={saveSuggestion}></AddSuggestion>
            </div>
        </>    
    )
}