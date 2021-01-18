import React, { ChangeEvent, useReducer, useState } from 'react';
import {database} from '../../firebase';
import Suggestion, {errors} from '../../models/Suggestion';
import './AddSuggestion.scss';

export interface IAddSuggestionProps {
    addSuggestion(act: Suggestion, isCreated: boolean): void;
}

export default function AddSuggestion(props: IAddSuggestionProps){
    const [suggestion, setSuggestion] = useReducer((state: Suggestion, newState: Suggestion)=> ({...state, ...newState}), new Suggestion());
    const [isCreated, setIsCreated] = useState(false);
    const suggestionId = database.ref('Suggestions').push().key;
    const [showThanks, setShowThanks] = useState(false);
   
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case "title":
                errors.errTitle =
                !value ? "OOPS! Du glömde fylla i fältet för Titel" : "";
              break;
            case "description":
               errors.errDescr =
               !value ? "Fyll i med en bra beskrivning tack!" : 
                value.length < 8 ? "Vi behöver en tydligare beskrivning  än så, Tack!" : "";
              break;
            default:
              break;
          }
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
        setShowThanks(true);
        
    }
setTimeout(() => {
    setShowThanks(false);
  }, 3000);

    return(
    <React.Fragment>
        <div id="suggestionContainer">        
            <div id="addSuggestion">
                <fieldset>
                    <div className="inputSection inputSectionSugg">
                        <label htmlFor="suggestionTitle"><p>TITEL</p> </label>
                        
                    <input type="text" name="title" className="activity-input inputTitle" id="inputTitle" onChange={handleChange}/>
                    <p className="errorMessages">{errors.errTitle}</p>
                    </div>
                    <div className="inputSection inputSectionSugg">
                    <label htmlFor="suggestionDescr"><p>BESKRIVNING</p> </label>
                    
                    <textarea name="description" className="activity-input inputDesc" id="inputDesc" onChange={handleText}/>
                    <p className="errorMessages">{errors.errDescr}</p>
                    </div>
                    <div className="inputSection inputSectionSugg"> 
                    <label htmlFor="suggestionLink"><p>LÄNK</p> </label>
                    <input type="text" name="link" className="activity-input inputLink"  onChange={handleChange}/>
                    </div>

                    <button type="button" id="saveBtnSugg" className=" saveBtn" onClick={createSuggestion}>Skicka till Databas</button>  

                </fieldset>
                {showThanks ? 
                <div id="thanks">
                    TACK <i className="fa fa-heart"></i>
                </div> : null }
            </div>
            <div>
        
            </div>
          
        </div>
    </React.Fragment>
        

    )
}