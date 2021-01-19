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
    const [titleValid, setTitleValid] = useState(false);
    const [descrValid, setDescrValid] = useState(false);
    const [showThanks, setShowThanks] = useState(false);
   
    const suggestionId = database.ref('Suggestions').push().key;
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const {name, value}  = e.target;
        
        name === 'title' ?
        (errors.errTitle =
        !value ? "OOPS! Du glömde fylla i fältet för Titel" : "" ) : (errors.errTitle = '');
        setSuggestion({[name]: value, ID: suggestionId} as any);
        errors.errTitle || !value ? setTitleValid(false) : setTitleValid(true);
    }

    function handleText(e: ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault(); 
        const value = e.target.value;
        errors.errDescr =
        !value ? "Fyll i med en bra beskrivning tack!" : 
        value.length < 8 ? "Vi behöver en tydligare beskrivning än så, Tack!" : "";        
        setSuggestion({description: value} as any);
        errors.errDescr || !value ? setDescrValid(false) : setDescrValid(true);
        
    }

    function createSuggestion(){
        props.addSuggestion(suggestion, isCreated);
        database.ref('Suggestions').push(suggestion);
        setIsCreated(true);
        setShowThanks(true);
        setSuggestion(new Suggestion());   
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
                        
                    <input type="text" name="title" className="activity-input inputTitle" id="inputTitle" value={suggestion.title} onChange={handleChange}/>
                    <p className="errorMessages">{errors.errTitle}</p>
                    </div>
                    <div className="inputSection inputSectionSugg">
                    <label htmlFor="suggestionDescr"><p>BESKRIVNING</p> </label>
                    
                    <textarea name="description" className="activity-input inputDesc" id="inputDesc" value={suggestion.description} onChange={handleText}/>
                    <p className="errorMessages">{errors.errDescr}</p>
                    </div>
                    <div className="inputSection inputSectionSugg"> 
                    <label htmlFor="suggestionLink"><p>LÄNK</p> </label>
                    <input type="text" name="link" className="activity-input inputLink" value={suggestion.link} onChange={handleChange}/>
                    </div>

                    <button type="button" id="saveBtnSugg" className=" saveBtn" disabled={!titleValid || !descrValid} onClick={createSuggestion}>Skicka!</button>
                </fieldset>
                {showThanks ? 
                    <div id="thanks">
                        TACK <i className="fa fa-heart"></i>
                    </div> : null }
            </div>         
        </div>
    </React.Fragment>
    )
}