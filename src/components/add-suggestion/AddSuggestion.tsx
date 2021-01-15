import React, { ChangeEvent, useReducer, useState } from 'react';
import Suggestion from '../../models/Suggestion';
import './AddSuggestion.scss';

export interface IAddSuggestionProps {
    addSuggestion(act: Suggestion, isCreated: boolean): void;
}


export default function AddSuggestion(props: IAddSuggestionProps){
const [suggestion, setSuggestion] = useReducer((state: Suggestion, newState: Suggestion)=> ({...state, ...newState}), new Suggestion());

const [isCreated, setIsCreated] = useState(false)
;

const [suggestions, setSuggestions] = useState<Suggestion[]>([]); 
const [suggestionId, setSuggestionId] = useState(Number);
const [showDiv, setShowDiv] = useState(false);
const [hideBtn, sethideBtn] = useState (true);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        setSuggestion({[name]: value, ID: suggestionId} as any);
    }
    function resetForm(){
        Array.from(document.querySelectorAll("input")).forEach( input => (input.value =""));
     
    }
    function addId(){
        let lastSuggestion : Suggestion = suggestions[suggestions.length-1];
        setSuggestionId(lastSuggestion.ID +1)
        console.log(suggestions)
    }

/* firebase.database().ref('Suggestion').on('value', (snapshot)=> {
    console.log(snapshot.val());
    const suggestionItem = snapshot.val();
    const suggestionList = []
    for(let id in suggestionItem){
        suggestionList.push(suggestionItem[id]);
    }
    console.log(suggestionItem)
   
}) */
    function createSuggestion(){
      props.addSuggestion(suggestion, isCreated)
        setIsCreated(true);
        resetForm();
        setShowDiv(false);
        sethideBtn(true);
    }

if (suggestions.length >= 1) {
    addId();
}

function showHide(){
    setShowDiv(true);
    sethideBtn(false);
}
    return(
        <React.Fragment>
    <div id="suggestionContainer">
        
            <div id="addSuggestion">
                <fieldset>
                    <div className="inputSection inputSectionSugg">
                        <label htmlFor="suggestionTitle"><p>TITEL</p> </label>
                    <input type="text" name="title" className="activity-input inputTitle" id="inputTitle" onChange={handleChange}/>
                    </div>
                    <div className="inputSection inputSectionSugg">
                    <label htmlFor="suggestionDescr"><p>BESKRIVNING</p> </label>
                    <input type="text" name="description" className="activity-input inputDesc" id="inputDesc" onChange={handleChange}/>
                    </div>
                    <div className="inputSection inputSectionSugg"> 
                    <label htmlFor="suggestionLink"><p>LÄNK</p> </label>
                    <input type="text" name="link" className="activity-input inputLink"  onChange={handleChange}/>
                    </div>
                </fieldset>
            </div>

            <div>
            {showDiv ? 
            <div id="reviewSuggestion" className="hideDiv">

                    <h3>{ suggestion.title}</h3> 
                    <p>{suggestion.description}</p>
                    <p>{suggestion.link}</p>

                    <button type="button" className="saveBtn" onClick={createSuggestion}>Skicka till Databas</button>
                
                </div> : null
                } ;
            </div>
            <div id="reviewBtn">
            {hideBtn ? 
                <button type="button" className="saveBtn saveBtnSugg" onClick={showHide}>Granska Förslag</button> : null
                }
            </div>
    </div>
        </React.Fragment>
        

    )
}