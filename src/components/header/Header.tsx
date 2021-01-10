import React from 'react';
import './Header.scss';
import headerLogo from '../../assets/Header.jpg';


export default function Header(){
    return(
        <React.Fragment>
           <div id="headerDiv">
               
           <img src={headerLogo} alt="Logo" />;
        
        </div> 
        </React.Fragment>
        
       
    )
}