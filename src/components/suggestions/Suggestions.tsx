import React, {useState, useEffect, } from 'react';
import { IAddSuggestionProps } from '../add-suggestion/AddSuggestion';
import firebase from '../../firebase';
import Suggestion from './../../models/Suggestion';
import './Suggestions.scss';

export interface ISuggestionsProps {
    suggestionSelected(clicked : boolean): void; 
}
export default function Suggestions(props: ISuggestionsProps){

    const [suggestions, setSuggestions] = useState(Array);
    const [isClicked, setIsClicked] = useState(false);

   useEffect(() => {
      const suggestionRef = firebase.database().ref('Suggestion');

    suggestionRef.on('value', (snapshot)=> {
     
         const suggestions = snapshot.val();
        const suggestionsArr = []
         for(let id in suggestions){
            suggestionsArr.push(suggestions[id]);
        }  
        setSuggestions(suggestionsArr)
      
        console.log(suggestions);
        
    })
  }, []); 


    /* useEffect(() => {
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
    console.log(suggestions); */
    
    function liClicked() {

        setIsClicked(true);
    }
    if (isClicked){
        props.suggestionSelected(isClicked)
    }
    return(
        <React.Fragment>
        <h1>Förslag</h1>
        <ul>
            {suggestions.map((suggestion : any) =>  {
               return <li className="suggestionList" onClick={liClicked} key=
               {suggestion.id}>
                   <div className="suggestionContDiv">
                    <h3>{suggestion.title}
                   </h3>
                    <p>{suggestion.description}
                    </p>
                  <p> länk: 
                {suggestion.link} 
                  </p>
                   </div>
                   <div className="deleteDiv">
                       <button className="deleteButton" >
                           Radera
                       </button>
                   </div>
                   
                </li>
            })}
        </ul>
        </React.Fragment>
    )
}