import React, { ChangeEvent, useContext, useState, MouseEvent, useReducer} from 'react';
import { useHistory } from 'react-router-dom';
import {auth} from '../../firebase'
import {AuthContext} from '../../contexts/AuthContext';
import UserData from '../../models/UserData';
import './LogIn.scss';


export default function LogIn(){
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const [userValues, setUserValues] = useReducer(
        (state: UserData, newState: UserData) => ({ ...state, ...newState }),
        new UserData()
      );
    const [error, setError] = useState('');

    function handleOnChange(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const {name, value} = e.target;
        setUserValues({[name]: value} as any);    
    }

   function handleSignIn(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setError('');
       
        auth.signInWithEmailAndPassword(userValues.email , userValues.password).then(res => {
            authContext.setUser(res.user);
            history.push('/admin');
            setUserValues({email: '', password: ''});
            }).catch(err => {
                console.log(err);
                if(err.code === "auth/wrong-password"){
                    setError('Hoppsan! Lösenordet var fel.');
                    return
                };
                if(err.code === "auth/user-not-found"){
                    setError('Denna e-mail har inte behörighet.');
                    return
                };
                if(err.code === "auth/invalid-email"){
                    setError('Du har uppgett fel e-mail.');
                    return
                } else {
                    setError('Oj då! Något blev tokigt, testa igen.')
                };
                 
            });
   }   
   return(
        <>
        <h1>Logga in!</h1>
       { error ? <div>{error}</div> : null}
        <form>
            <fieldset>
                <div>
                    <label htmlFor="email">E-mail</label>
                    <input type="text" name="email" defaultValue={userValues.email} onChange={handleOnChange} />
                </div>
                <div>
                    <label htmlFor="Password">Lösenord</label>
                    <input type="password" name="password" defaultValue={userValues.password} onChange={handleOnChange} />
                </div>
                <button type='button' onClick={handleSignIn}>Logga in!</button>
            </fieldset>
        </form>
        </>
    )
}