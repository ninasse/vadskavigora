/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, MouseEvent, useEffect} from 'react';
import './CategoryButton.scss';

export interface ICategoryButtonsProps {
    filterCategory(category: string, isSelected: boolean): void;
}
export default function CategoryButton(props: ICategoryButtonsProps){
   
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selected, setSelected] = useState(false);
   
    function sendCategory(){
        props.filterCategory(selectedCategory, selected);
    }
   
    function saveCategory(e: MouseEvent<HTMLButtonElement>) {
        
        e.preventDefault();
        const otherBtns = document.querySelector('.btnClicked');
        otherBtns?.setAttribute('class', 'unclicked');

        let value = (e.target as HTMLButtonElement).value;
        let selectedBtn = e.currentTarget as HTMLButtonElement;

        selectedBtn.value === value ? selectedBtn.className='btnClicked' : selectedBtn.className='unclicked';
        
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
                <div id='alla' >
                    <button type='button' value='alla'  className="unclicked" onClick={saveCategory}>Alla</button>
                </div>
                <div id='inomhus'>
                    <button type='button' value='inomhus'  className="unclicked" onClick={saveCategory}>Inomhus</button>
                </div>
            </div>
            <div className="categoryDiv">
                <div id='utomhus'>
                    <button type='button' value='utomhus' className="unclicked" onClick={saveCategory}>Utomhus</button>
                </div>
                <div id='baka'>
                    <button type='button' value='baka' className="unclicked" onClick={saveCategory}>Baka</button>
                 </div>
            </div> 
        </div>
        </React.Fragment> 
    )
}