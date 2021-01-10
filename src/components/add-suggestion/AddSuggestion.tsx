import firebase from 'firebase';
import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
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
    }

if (suggestions.length >= 1) {
    addId();
}

    return(
        <React.Fragment>
        <h1>ADD SUGGEASTION</h1>
        
            <label htmlFor="suggestionTitle"><p>TITEL</p> </label>
            <input type="text" name="title" className="suggestion-input" id="inputTitle" onChange={handleChange}/>

            <label htmlFor="suggestionDescr"><p>BESKRIVNING</p> </label>
            <input type="text" name="description" className="suggestion-input" id="inputDesc" onChange={handleChange}/>

            <label htmlFor="suggestionLink"><p>LÄNK</p> </label>
            <input type="text" name="link" className="suggestion-input" id="inputLink" onChange={handleChange}/>

            <button type="button" id="saveBtn" onClick={createSuggestion}>Skicka till Databas</button>
        </React.Fragment>
        

    )
}