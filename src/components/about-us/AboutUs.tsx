import React from 'react';
import './AboutUs.scss';
import nina from '../../assets/nina.png';
import caroline from '../../assets/caroline.png';
import { Link } from 'react-router-dom';

export default function AboutUs() {
    return(
        <React.Fragment>
            <div>
                <div className="goBack">
                <Link to="/"><button>Tillbaka</button></Link>
                </div>
            </div>

            <div id="aboutUsContainer">
            
                <div id="photoContainer">
                    <div>
                        <img id="nina" className="usPhoto" src= {nina} alt="Nina" />
                    </div>
                    <div>
                       <img id="caroline" className="usPhoto" src={caroline} alt="Caroline" /> 
                    </div>       
                </div>

                <div id="aboutUsTextC">
                    <p className="aboutUsText">Bakom denna fantastiska sida hittar du oss. Nina och Caroline, två svåbarnsmammor som bestämde sig för att underlätta vardagen för andra föräldrar i vårt 
                    examensarbete till Front end Developer.
                    </p>
                </div>

            </div>
        </React.Fragment>
    )
}