/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, MouseEvent, useEffect } from 'react';
import './CategoryButton.scss';

export interface ICategoryButtonsProps {
    filterCategory(category: string, isSelected: boolean): void;
}
export default function CategoryButton(props: ICategoryButtonsProps){
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selected, setSelected] = useState(false);
   /*  const [btnState , setBtnState] = useState(false);
    const [unClicked, setUnClicked] = useState(true); */

    function saveCategory(e: MouseEvent<HTMLButtonElement>) {
       /*  
        e.currentTarget.className='btn-style'; */
       
        e.preventDefault();
        let value = (e.target as HTMLButtonElement).value
        setSelectedCategory(value);
        setSelected(true);
       /* 
        setBtnState(!btnState);
         */
    }
    
    function sendCategory(){
        props.filterCategory(selectedCategory, selected);
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
                    <button type='button' className="unclicked" value='alla' onClick={saveCategory}>Alla</button>
                </div>
                <div id="catButtonTwo">
                    <button type='button' value='inomhus' className="unclicked" onClick={saveCategory}>Inomhus</button>
                </div>
            </div>
            <div className="categoryDiv">
                <div id="catButtonThree">
                    <button type='button' value='utomhus' className="unclicked" onClick={saveCategory}>Utomhus</button>
                </div>
                <div id="catButtonFour">
                    <button type='button' className="unclicked" value='baka' onClick={saveCategory}>Baka</button>
                 </div>
            </div> 
        </div>
        </React.Fragment> 
    )
}