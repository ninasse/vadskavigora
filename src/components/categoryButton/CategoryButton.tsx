/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, MouseEvent, useEffect } from 'react';
import './CategoryButton.scss';

export interface ICategoryButtonsProps {
    filterCategory(category: string): void;
}
export default function CategoryButton(props: ICategoryButtonsProps){
    const [selectedCategory, setSelectedCategory] = useState('');

    function saveCategory(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let value = (e.target as HTMLButtonElement).value
        setSelectedCategory(value);
    }
    
    function sendCategory(){
        props.filterCategory(selectedCategory);
    }
    
    useEffect(() => {
        if(selectedCategory) {
            console.log(selectedCategory);
            sendCategory();
            setSelectedCategory(''); 
        }
    }, [selectedCategory]);
   

    return(
        <React.Fragment>
        <div id="categoryComp">
            <div className="categoryDiv">
                <div id="catButtonOne" >
                    <button type='button' value='alla' onClick={saveCategory}>Alla</button>
                </div>
                <div id="catButtonTwo">
                    <button type='button' value='inomhus' onClick={saveCategory}>Inomhus</button>
                </div>
            </div>
            <div className="categoryDiv">
                <div id="catButtonThree">
                    <button type='button' value='utomhus' onClick={saveCategory}>Utomhus</button>
                </div>
                <div id="catButtonFour">
                    <button type='button' value='baka' onClick={saveCategory}>Baka</button>
                 </div>
            </div> 
        </div>
        </React.Fragment> 
    )
}