import React, { ChangeEvent, useReducer, useState } from 'react';
import {database} from '../../firebase';
import Suggestion from '../../models/Suggestion';
import './AddSuggestion.scss';

export interface IAddSuggestionProps {
    addSuggestion(act: Suggestion, isCreated: boolean): void;
}

export default function AddSuggestion(props: IAddSuggestionProps){
    const [suggestion, setSuggestion] = useReducer((state: Suggestion, newState: Suggestion)=> ({...state, ...newState}), new Suggestion());
    const [isCreated, setIsCreated] = useState(false);
    const [showDiv, setShowDiv] = useState(false);
    const [hideBtn, sethideBtn] = useState (true);
    const suggestionId = database.ref('Suggestions').push().key;
   
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        setSuggestion({[name]: value, ID: suggestionId} as any);
    }
    function handleText(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault(); 
        setSuggestion({description: e.target.value} as any);
    }
    function resetForm(){
        Array.from(document.querySelectorAll("input")).forEach( input => (input.value = ""));
     
    }
 
    function createSuggestion(){
        props.addSuggestion(suggestion, isCreated);
        database.ref('Suggestions').push(suggestion);
        setIsCreated(true);
        resetForm();
        setShowDiv(false);
        sethideBtn(true);
    }

    function showSuggestion(){
        setShowDiv(true);
        sethideBtn(false);
    }
    return(
        <>
        <div id="suggestionContainer">        
            <div id="addSuggestion">
                <fieldset>
                    <div className="inputSection inputSectionSugg">
                        <label htmlFor="suggestionTitle"><p>TITEL</p> </label>
                    <input type="text" name="title" className="activity-input inputTitle" id="inputTitle" onChange={handleChange}/>
                    </div>
                    <div className="inputSection inputSectionSugg">
                    <label htmlFor="suggestionDescr"><p>BESKRIVNING</p> </label>
                    <textarea name="description" className="activity-input inputDesc" id="inputDesc" onChange={handleText}/>
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
                <button type="button" className="saveBtn saveBtnSugg" onClick={showSuggestion}>Granska Förslag</button> : null
                }
            </div>
        </div>
        </>
    )
}