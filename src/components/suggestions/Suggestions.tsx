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
    const [expandDiv, setExpandDiv] = useState(false);
    
    
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

    function deleteSuggestion(e: MouseEvent<HTMLButtonElement>){
        console.log(e)
        const id = String(e);
       
       suggestionsRef.orderByChild('ID').equalTo(id).on('value', (snapshot)=> {
           snapshot.forEach((data: any)=>{
            suggestionsRef.child(data.key).remove()
           })
       })
        
        
    }
    function liClicked(e: MouseEvent<HTMLElement>) {
        e.preventDefault();

        setIsClicked(true);
        setExpandDiv(true);
       
    }

    function closeModal(e: MouseEvent<HTMLElement>) {
        e.preventDefault()
        console.log("hej från close");
        setExpandDiv(false);
        console.log(expandDiv);
    }

    if (isClicked){
        props.suggestionSelected(isClicked)
    }

    return(
        <>
        <h1>Förslag</h1>
        <ul>
            {suggestions.map((suggestion : any) =>  {
              
               return <li className="suggestionList" key=
               {suggestion.ID}> 
                    <div> 
                       <div>
                        <button className="viewBtn" onClick={liClicked}>Granska</button>
                    </div>         
                    <h3>{suggestion.title}</h3>
                   
                   </div> 
                   {expandDiv? 
                    <div className="modal">
                    <div className="modal-content">
                    <span className="close" onClick={closeModal}>
                        &times;</span>
                      <h3>{suggestion.title} </h3> 
                      <p>{suggestion.description}</p>
                      <span>{suggestion.link}</span> 

                      <button id={suggestion.ID} onClick={()=> deleteSuggestion(suggestion.ID)}   className="deleteButton deletesugg" >
                           Radera
                    </button>
                    </div>
                    
                    </div> : null }
                </li>
                
            })}
        </ul>

        </>
    )
}