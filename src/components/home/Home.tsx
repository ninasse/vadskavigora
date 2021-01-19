/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import firebase from './../../../src/firebase';
import Activity from '../../models/Activity';
import './Home.scss';
import CategoryButton from '../categoryButton/CategoryButton';

export default function Home(){

    const [allActivities, setAllActivities] = useState<Activity[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState(new Activity());
    const [selectedCategory, setSelectedCategory] = useState('alla');
    const [allSelected, setAllSelected] = useState(true);
    const [notAllSelected, setNotAllSelected] = useState(false);
    const [isCategorySelected, setIsCategorySelected] = useState(false);
    const [randomNumber, setRandomNumber] = useState(Number);
    const [activityPresented, setActivityPresented] = useState(false);
    const [searchDone, setSearchDone] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    function filterCategory(category: string, isSelected: boolean){
        setSelectedCategory(category);
        setNotAllSelected(true);
        setIsCategorySelected(isSelected);
    }

    useEffect(() => {
        firebase
            .firestore()
            .collection('activities').orderBy('ID')
            .onSnapshot((snapshot) => {
                setAllActivities(snapshot.docs.map((doc: any) => ({
                    id: doc.id,
                    ...doc.data()
                    })
                ))
            })
    }, []);

    function getActivity() {
        let actID = sessionStorage.getItem('ShownActivity');
        setIsLoading(true);
        console.log('FRÅN GETACTIVITY',selectedCategory);
        console.log(randomNumber);
         if(selectedCategory !== 'alla' && randomNumber <= filteredActivities.length) {
            console.log('FILTEREDACTIVITIES', filteredActivities.length);
            setSelectedActivity(filteredActivities[randomNumber]);
            console.log(filteredActivities[randomNumber].title,  filteredActivities[randomNumber].ID);     
        } 
        if(selectedCategory === 'alla' && randomNumber <= allActivities.length) {
            console.log('ALLACTIVITIES', allActivities.length);
            setSelectedActivity(allActivities[randomNumber]);
            console.log(allActivities[randomNumber].title, allActivities[randomNumber].ID); 
        }
        
        if(selectedActivity){
            setIsLoading(false);
            sessionStorage.setItem('ShownActivity', String(selectedActivity.ID));
            if (actID === String(selectedActivity.ID)){
                if(filteredActivities.length > 0){
                    setSelectedActivity(filteredActivities[randomNumber-1]);
                } else {
                    setSelectedActivity(allActivities[randomNumber-1]);
                }
            };
        }; 
        setAllSelected(true); 
        setNotAllSelected(false); 
        setActivityPresented(true);
        setSearchDone(true);
        console.log(actID);    
    }
    
    function createIdNo(){
        if(filteredActivities.length > 0 && isCategorySelected){
            let num = Math.floor(Math.random() * filteredActivities.length)
            setRandomNumber(num)
            setIsCategorySelected(false); 
            getActivity();
            return
        }

        if(selectedCategory === 'alla' && allSelected) {
            let num = Math.floor(Math.random() * allActivities.length)
            setRandomNumber(num);
            setAllSelected(false);
            return
        }
    }

    function selectedCategorySearch(){
        if(selectedCategory !== 'alla' && notAllSelected) {
            console.log('Chosen CAT ', selectedCategory);
            let filteredCatList : Activity[]= [];
            allActivities.forEach((a: Activity) => {
               if(a.category.includes(selectedCategory)) {
                    filteredCatList.push(a);
                }
            });
            setFilteredActivities(filteredCatList);
            setNotAllSelected(false);
        }  
    }

    function searchAgain(){
        if(searchDone){
            if(selectedCategory !== 'alla'){
                setNotAllSelected(true);
                setIsCategorySelected(true);
                createIdNo();
                return;
            } 
            if(selectedCategory === 'alla'){
                setAllSelected(true); 
                createIdNo();
                getActivity();
                return;
            } 
        }
    }

    if(allActivities.length > 0){
        if(selectedCategory !== 'alla'){
            selectedCategorySearch();
            createIdNo();
        } else {
            createIdNo();
        }       
    }

    return(
        <div className='mainHomeContainer'>
            <CategoryButton filterCategory={filterCategory}/>
            <div className='activityWrapper'>
                {isLoading ? <div id='errMessage'>Oj oj, vad hände nu?! Vi förstår att du vill ha en aktivitet presenterad för dig, gör en ny sökning så löser det sig.</div> : <div className="activityContainer">
                {allActivities.length >= 0 && !searchDone? <div id='welcomeMsg'><div>
                <span className="welcomeText"> Känner du dig helt slut på idéer och barnen klättrar på väggarna? </span>
                <span className="welcomeText">Låt oss hjälpa dig!</span>
            </div></div>: <div className='dontShow'></div>}
                {allActivities.length <= 0  && searchDone ? <div>Hoppsan! Finns inget roligt att visa just nu...</div>: null}
                {selectedActivity && allActivities.length > 0 && searchDone? 
                    <div id="textPresentation">
                        <span id="activityTitle"> <div>{selectedActivity.title}</div> </span>
                        <div id="activityDesc"> {selectedActivity.description} </div>
                        <div id="activityLink"> 
                        {selectedActivity.link ? <a href={selectedActivity.link}>Mer information</a> : null }
                        </div>
                    </div>
               : null} 
                </div>}
            </div>
            <div className='getActivityButton'>
                {activityPresented ? <button type='button' className="btn-new" onClick={searchAgain}>Ge mig något roligare!</button> : <button type='button' className="btn-new" onClick={getActivity}>Ge mig nåt kul!</button>}
            </div>
        </div>
        
    )
}