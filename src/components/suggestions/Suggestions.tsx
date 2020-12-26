import React, {useState, useEffect, } from 'react';
import firebase from './../../../src/firebase';
import Suggestion from './../../models/Suggestion';
import './Suggestions.scss';

export default function Suggestions(){

    const [suggestions, setSuggestions] = useState(Array);

    useEffect(() => {
     firebase
     .firestore()
     .collection('suggestions')
     .onSnapshot((snapshot) => {
        const suggestionsArr = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        }))
        setSuggestions(suggestionsArr)
     })
    },[])
    console.log(suggestions);
    return(
        <React.Fragment>
        <h1>Suggestions component</h1>
        <ul>
            {suggestions.map((suggestion: any) =>  {
               return <li key={suggestion.id}>
                    {suggestion.title}
                   
                </li>
            })}
        </ul>
        </React.Fragment>
    )
}