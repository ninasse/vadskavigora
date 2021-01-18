import React, {useState, useEffect, } from 'react';
import firebase from '../../firebase';
import Suggestion from './../../models/Suggestion';
import './Suggestions.scss';

export interface ISuggestionsProps {
    suggestionSelected(clicked : boolean): void; 
}
export default function Suggestions(props: ISuggestionsProps){

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const suggestionsRef = firebase.database().ref('Suggestions');

   useEffect(() => {
    
    suggestionsRef.on('value', (snapshot)=> {
        const suggestions = snapshot.val();
        const suggestionsArr: Suggestion[] = []
        for(let i in suggestions){
            suggestionsArr.push(suggestions[i]);
        }
        setSuggestions(suggestionsArr)  
        })
  // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    
    function liClicked() {
        setIsClicked(true);
    }

    function deleteSuggestion() {

    }

    if (isClicked){
        props.suggestionSelected(isClicked)
    }

    return(
        <>
        <h1>Förslag</h1>
        <ul>
            {suggestions.map((suggestion : any) =>  {
               return <li className="suggestionList" onClick={liClicked} key=
               {suggestion.ID}>
                   <div className="suggestionContDiv">
                    <h3>{suggestion.title}
                   </h3>
                    <p>{suggestion.description}
                    </p>
                  <p> länk: 
                {suggestion.link} 
                  </p>
                   </div>
                   <div className="deleteDiv">
                       <button /* onClick="deleteSuggestion" */ className="deleteButton" >
                           Radera
                       </button>
                   </div>   
                </li>
            })}
        </ul>
        </>
    )
}