import React from 'react';
import './Footer.scss';
import { BrowserRouter as Route, Link } from 'react-router-dom';

export default function Footer(){
    return (
        <div id="footer">
        
            <div>
                <Link to="/about-us"><button id="buttonAboutUs">Om oss</button></Link>
            
            </div>
           
            <div>
                <Link to="/suggestion"><button id="suggestionHome">Skicka in Förslag</button></Link>
            </div>
        </div>
    )
}