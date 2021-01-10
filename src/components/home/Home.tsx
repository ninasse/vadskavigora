/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import firebase from './../../../src/firebase';
import Activity from '../../models/Activity';
import './Home.scss';
import CategoryButton from '../categoryButton/CategoryButton';

export default function Home(){

    const [allActivities, setAllActivities] = useState<Activity[]>([]);
    const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('alla');
    const [allSelected, setAllSelected] = useState(true);
    const [notAllSelected, setNotAllSelected] = useState(false);
    const [categorySelected, setCategorySelected] = useState(false);
    const [randomNumber, setRandomNumber] = useState(Number);
    const [selectedActivity, setSelectedActivity] = useState(new Activity());
    const [activityPresented, setActivityPresented] = useState(false);
    const [searchDone, setSearchDone] = useState(false)

    function filterCategory(category: string){
        setSelectedCategory(category);
        console.log(category);
        setNotAllSelected(true);
        setCategorySelected(true);
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
            setSelectedCategory(selectedCategory);
    }, []);

    function selectedCategoryStatus() {
        if(selectedCategory !== 'alla' && notAllSelected) {
            console.log('VALD KATEGORI ', selectedCategory);
            let filteredCatList : Activity[]= [];
            allActivities.forEach((a: Activity) => {
               if(a.category.includes(selectedCategory)) {
                    filteredCatList.push(a)
                }
            });
            setFilteredActivities(filteredCatList);
            setNotAllSelected(false);
        }
        if(selectedCategory === 'alla' && allSelected) {
            setRandomNumber(Math.floor(Math.random() * allActivities.length));
            setAllSelected(false);
            console.log('ALLA')
        }  
    }

    if(allActivities.length > 0) {
       if(selectedCategory !== 'alla' && searchDone) {
           setNotAllSelected(true);
           setSearchDone(false);
           selectedCategoryStatus();
       } 
       if(selectedCategory === 'alla' && searchDone){
           setAllSelected(true);
           setSearchDone(false);
           selectedCategoryStatus();
       }
           selectedCategoryStatus();
    }

    if(filteredActivities.length > 0 && categorySelected){
        setRandomNumber(Math.floor(Math.random() * filteredActivities.length));
        setCategorySelected(false);
        getActivity();
    }
        
    
    function getActivity() {
        console.log('RANDOMNUMBER ', randomNumber);
         if(selectedCategory !== 'alla' && randomNumber <= filteredActivities.length) {
            console.log('FILTEREDACTIVITIES', filteredActivities.length);
            setSelectedActivity(filteredActivities[randomNumber]);
            console.log(filteredActivities[randomNumber].title)
        } else {
            console.log('ALLACTIVITIES', allActivities.length);
            setSelectedActivity(allActivities[randomNumber]);
            console.log(allActivities[randomNumber].title)
        }
        setActivityPresented(true);
        setRandomNumber(Number);
        setSearchDone(true);
        setAllSelected(true);
        setNotAllSelected(false);
        
    }

    return(
        <React.Fragment>
            <CategoryButton filterCategory={filterCategory}/>

            <div className="activityContainer">
                <div id="textPresentation">
                   <span id="activityTitle"> {selectedActivity ? <div>{selectedActivity.title}</div> : null} </span>
                    <div id="activityDesc"> {selectedActivity.description} </div>
                    <div id="activityLink"> 
                    {selectedActivity.link ? <a href={selectedActivity.link}>Mer information</a> : null }
                    
                    </div>
        
                </div>
               
            
                <div className='getActivityButton'>
                    {activityPresented ? <button type='button' className="btn-new" onClick={getActivity}>Ge mig något roligare!</button> : <button type='button' className="btn-new" onClick={getActivity}>Ge mig nåt kul!</button>}
                </div>
            </div>
           
        
        </React.Fragment>
        
    )
}