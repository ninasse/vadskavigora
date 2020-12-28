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
        <h1>Förslag</h1>
        <ul>
            {suggestions.map((suggestion: any) =>  {
               return <li className="suggestionList" key=
               {suggestion.id}>
                   <div className="suggestionContDiv">
                    <h3>{suggestion.title}
                   </h3>
                    <p>{suggestion.description}
                    </p>
                  <p>
                {suggestion.link} 
                  </p>
                   </div>
                   <div className="deleteDiv">
                       <button className="deleteButton">
                           Radera
                       </button>
                   </div>
                   
                </li>
            })}
        </ul>
        </React.Fragment>
    )
}