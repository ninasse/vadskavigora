import React from 'react';
import './CategoryButton.scss';


export default function CategoryButton(){
    return(
        <React.Fragment>

        <div id="categoryComp">

            <div className="categoryDiv">
                
                <div id="catButtonOne">
                    <button>Alla</button>
                </div>

                <div id="catButtonTwo">
                    <button>Inomhus</button>
                </div>
            </div>

            <div className="categoryDiv">
                <div id="catButtonThree">
                    <button>Utomhus</button>
                </div>

                <div id="catButtonFour">
                    <button>Baka</button>
                    </div>
            </div>
            
        </div>
        </React.Fragment> 
    )
}