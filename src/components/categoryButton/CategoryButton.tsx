/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, MouseEvent, useEffect} from 'react';
import './CategoryButton.scss';

export interface ICategoryButtonsProps {
    filterCategory(category: string, isSelected: boolean): void;
}
export default function CategoryButton(props: ICategoryButtonsProps){
   
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selected, setSelected] = useState<boolean>(false);
    const [selectedButton, setSelectedButton] = useState<HTMLButtonElement>();
   
    function sendCategory(){
        props.filterCategory(selectedCategory, selected);
    }
   
    function saveCategory(e: MouseEvent<HTMLButtonElement>) {
        
        e.preventDefault();

        if(selectedButton?.className === 'btnClicked'){
            selectedButton.className = 'unclicked'
        };
       
        let value = (e.target as HTMLButtonElement).value;
        let selectedBtn = e.currentTarget as HTMLButtonElement;

        selectedBtn.className='btnClicked';
        setSelectedButton(selectedBtn);
        setSelectedCategory(value);
        setSelected(true);     
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
                <button id='alla' type='button' value='alla'  className="unclicked" onClick={saveCategory}> Alla </button>            
                <button id='inomhus' type='button' value='inomhus'  className="unclicked" onClick={saveCategory}>Inomhus </button>            
            </div>
            <div className="categoryDiv">               
                <button id='utomhus' type='button' value='utomhus' className="unclicked" onClick={saveCategory}>Utomhus </button>                
                <button id='baka' type='button' value='baka' className="unclicked" onClick={saveCategory}>Baka </button>                 
            </div> 
        </div>
        </React.Fragment> 
    )
}