import React, {useState, useEffect, MouseEvent} from 'react';
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
    const [expandDiv, setExpandDiv] = useState(Boolean);

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

    
    function liClicked(e: MouseEvent<HTMLElement>) {
        e.preventDefault();
       console.log(e);
        
       const otherLis = document.querySelector('.expandLi');

       otherLis?.setAttribute('class','suggestionList');

       let value = (e.target as HTMLLIElement).value;
       let selectedLi = e.currentTarget as HTMLLIElement;

       selectedLi.value === value ? selectedLi.className='expandLi' : selectedLi.className='suggestionList';

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
                   
                    <h3>{suggestion.title}
                   </h3>
                    <p>{suggestion.description}
                    </p>
                  <p> länk: 
                {suggestion.link} 
                  </p>

                  <button /* onClick="deleteSuggestion" */ className="deleteButton" >
                           Radera
                       </button>
                </li>
            })}
        </ul>
        </>
    )
}