import React from 'react';
import './Header.scss';
import headerLogo from '../../assets/Header.jpg';
import { Link } from 'react-router-dom';


export default function Header(){
    return(
        <React.Fragment>
           <div id="headerDiv">
           <Link to="/">
                <img src={headerLogo} alt="Logo" />
            </Link>  
           
        
        </div> 
        </React.Fragment>
        
       
    )
}