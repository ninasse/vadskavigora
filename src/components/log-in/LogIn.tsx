import React, { ChangeEvent, useContext, useState, MouseEvent, useReducer } from 'react';
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
       console.log(userValues.email)
        e.preventDefault();
        setError('');
       
        auth.signInWithEmailAndPassword(userValues.email , userValues.password).then(res => {
            console.log('RES -->', res);
            authContext.setUser(res);
            history.push('/admin');
            }).catch(err => {
                console.log(err.message);
                setError(err.message)
            });
   }   
   return(
        <>
        <h1>Logga in!</h1>
        {error ? <div>{error}</div> : null}
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