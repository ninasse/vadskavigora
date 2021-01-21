import React, {useState, useEffect, MouseEvent} from 'react';
import {database} from '../../firebase';
import Suggestion from './../../models/Suggestion';
import './Suggestions.scss';

export interface ISuggestionsProps {
    suggestionSelected(clicked : boolean): void; 
}
export default function Suggestions (){

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isClicked, setIsClicked] = useState(false);  
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
        const id = String(e);
       
       suggestionsRef.orderByChild('ID').equalTo(id).on('value', (snapshot)=> {
           snapshot.forEach((data: any)=>{
            suggestionsRef.child(data.key).remove()
           })
       }) 
    }
    function openModal(e: MouseEvent<HTMLButtonElement>) {
        setIsClicked(true)
        const modal: any = document.getElementById(String(e)); 
        modal.className = 'modal'
         
    }

    function closeModal(e: MouseEvent<HTMLElement>) {
        let modal: any= document.getElementById(String(e));
        modal.className = 'hiddenModal';
        setIsClicked(false)
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
                            <button className="viewBtn" onClick={()=>openModal(suggestion.ID)}>Granska</button>
                        </div>         
                        <h3>{suggestion.title}</h3>                   
                   </div>               
                    <div className="hiddenModal" id={suggestion.ID}>
                        <div className="modal-content">
                        <div className="close" onClick={() =>closeModal(suggestion.ID)}><i className="fa fa-times fa-2x"></i></div>
                            <h3 id="titelModal">{suggestion.title}</h3> 
                            <p id="pModal">{suggestion.description}</p>
                            <span>{suggestion.link}</span> 
                            
                              <button id={suggestion.ID} onClick={()=> deleteSuggestion(suggestion.ID)} className="deleteButton">
                            <i className="fa fa-trash fa-2x"></i>
                            </button>  
                            
                            
                        </div>
                    </div>
                </li>
                
            })}
        </ul>
        </>
    )
}