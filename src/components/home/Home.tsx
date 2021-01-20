/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {firestore} from './../../../src/firebase';
import Activity from '../../models/Activity';
import './Home.scss';
import CategoryButton from '../categoryButton/CategoryButton';
import Banner from '../banner/Banner';

export default function Home(){

    const [allActivities, setAllActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState(new Activity());
    const [selectedCategory, setSelectedCategory] = useState<string>('alla');
    const [isCategorySelected, setIsCategorySelected] = useState<boolean>(false);
    const [searchDone, setSearchDone] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    function filterCategory(category: string, isSelected: boolean){
        setSelectedCategory(category);
        setIsCategorySelected(isSelected);
    }

    useEffect(() => {
        if(selectedCategory !== 'alla'){
            firestore
            .collection('activities').where('category', 'array-contains', selectedCategory)
                .onSnapshot((snapshot) => {
                    setAllActivities(snapshot.docs.map((doc: any) => ({
                        id: doc.id,
                        ...doc.data(),
                    }), 
                ))
            })
        }
        if(selectedCategory === 'alla'){
            firestore
                .collection('activities')
                .onSnapshot((snapshot) => {
                    setAllActivities(snapshot.docs.map((doc: any) => ({
                        id: doc.id,
                        ...doc.data(),
                    }), 
                ))
            })   
        }
    }, [selectedCategory]);


    function getActivity() { 
        setIsLoading(true);
        let random: number = Math.floor(Math.random() * allActivities.length);
        let actID = sessionStorage.getItem('ShownActivity');
        setSelectedActivity(allActivities[random]);

        if(selectedActivity){
            setIsLoading(false);
            sessionStorage.setItem('ShownActivity', String(selectedActivity.ID));
            if (actID === String(allActivities[random].ID)){
                    let random: number = Math.floor(Math.random() * allActivities.length);
                    setSelectedActivity(allActivities[random]);
            };
        }; 
        setSearchDone(true);  
    }
    
    function searchAgain(){
        if(searchDone){    
            setIsCategorySelected(true);
            getActivity();
        }
    }

    if(allActivities.length > 0 && isCategorySelected){
        getActivity();
        setIsCategorySelected(false);     
    } 

    return(
        <div className='mainHomeContainer'>
            <div id='catButtonContainer'>
                <CategoryButton filterCategory={filterCategory}/>
            </div>
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
                {searchDone? <button type='button' className="btn-new" onClick={searchAgain}>Ge mig något roligare!</button> : <button type='button' className="btn-new" onClick={getActivity}>Ge mig nåt kul!</button>}
            </div>
            <Banner />
        </div>
        
    )
}