/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, MouseEvent, useEffect } from 'react';
import './CategoryButton.scss';

export interface ICategoryButtonsProps {
    filterCategory(category: string, isSelected: boolean): void;
}
export default function CategoryButton(props: ICategoryButtonsProps){
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selected, setSelected] = useState(false);
    const [clickedButton, setClickedButton]= useState<HTMLDivElement | null>(null)
    const [theOtherButtons, setTheOtherButtons]= useState<HTMLDivElement | null>(null)

    function sendCategory(){
        props.filterCategory(selectedCategory, selected);
    }
   
    function saveCategory(e: MouseEvent<HTMLButtonElement>) {
       
        e.preventDefault();
        let value = (e.target as HTMLButtonElement).value;
        setSelectedCategory(value);
        setSelected(true);
        const unClickedBtn: HTMLDivElement | null = document.querySelector('.btnClicked');
        setTheOtherButtons(unClickedBtn);
        theOtherButtons?.setAttribute('class', 'unclicked');
       
        const clickedBtn: HTMLDivElement | null = document.querySelector('#'+value)
        setClickedButton(clickedBtn)
        clickedButton?.setAttribute('class', 'btnClicked');

        if(selectedCategory){
            sendCategory();
        }
    }
    
    /* useEffect(() => {
        if(selectedCategory) {
            console.log(selectedCategory);
            sendCategory();
            setSelectedCategory(''); 
           
        }
    }, [selectedCategory]); */
   

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