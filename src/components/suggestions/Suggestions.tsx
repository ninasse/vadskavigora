import React, {useState, useEffect, MouseEvent} from 'react';
import {database} from '../../firebase';
import Suggestion from './../../models/Suggestion';
import './Suggestions.scss';

export interface ISuggestionsProps {
    suggestionSelected(clicked : boolean): void; 
}
export default function Suggestions(props: ISuggestionsProps){

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isClicked, setIsClicked] = useState(false);
    const [selectedSuggestion, setSelectedSuggestion] = useState<HTMLLIElement>();
    const [expandDiv, setExpandDiv] = useState(Boolean);

    const suggestionsRef = database.ref('Suggestions');
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

    function deleteSuggestion(){
        //console.log(suggestions)
       // suggestionsRef.child()
        
    }
    function liClicked(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
        console.log(e);

       if(selectedSuggestion?.className === 'expandLi'){
           selectedSuggestion.className = 'suggestionList'
       };

        let selectedLi = e.currentTarget as HTMLLIElement;
        selectedLi.className='expandLi';

        setSelectedSuggestion(selectedLi)
        setIsClicked(true);
        setExpandDiv(!expandDiv);
    }

    if (isClicked){
        props.suggestionSelected(isClicked)
        console.log(Suggestion);
    }

    return(
        <>
        <h1>Förslag</h1>
        <ul>
            {suggestions.map((suggestion : any) =>  {
               return <li className="suggestionList" onClick={liClicked} key=
               {suggestion.ID}>                   
                    <h3>{suggestion.title}</h3>
                    <p>{suggestion.description}</p>
                    <p> länk: {suggestion.link}</p>
                    <button id={suggestion.ID}  onClick={deleteSuggestion}  className="deleteButton" >
                           Radera
                    </button>
                </li>
            })}
        </ul>
        </>
    )
}