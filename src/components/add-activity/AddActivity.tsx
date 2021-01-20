import React, { ChangeEvent, useReducer, useState } from 'react';
import {firestore} from '../../firebase';
import Activity , {errors} from '../../models/Activity';
import './AddActivity.scss';

export interface IAddActivityProps {
    addActivity(act: Activity, isCreated: boolean): void;
}

export default function AddActivity(props: IAddActivityProps){
    const [activity, setActivity] = useReducer((state: Activity, newState: Activity) => ({ ...state, ...newState }),
    new Activity());
    const [isCreated, setIsCreated] = useState(false);
    const [activityFormRender, setActivityFormRender] = useState(false);
    const [dataCollected, setDataCollected] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activityId, setActivityId] = useState(Number);
    const [inputsValid, setInputsValid] = useState(false);
    const [checkBoxValid, setCheckboxValid] = useState(false);
    const [formValid, setFormValid] = useState(false);
    
   
    function addId() {
        let lastActivity : Activity = activities[activities.length -1];
        setActivityId(lastActivity.ID +1);
    } 
 
    function createActivity() {
        props.addActivity(activity, isCreated);
        setActivityFormRender(false);
        setIsCreated(false);
        setActivity(new Activity());
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case "title":
              errors.errTitle =
                !value ? "OOPS! Du glömde fylla i fältet för Titel" : "";
              break;
            case "description":
               errors.errDescription =
               !value ? "Fyll i med en bra beskrivning tack!" : 
                value.length < 5 ? "Behöver nog en tydligare beskrivning, Tack!" : "";
              break;
            default:
              break;
          }
        
      if(!errors.errTitle && !errors.errDescription ) { 
          setInputsValid(true) 
        } else {
          setInputsValid(false);
          setFormValid(false);
        }
        setActivity({[name]: value, ID: activityId} as any);
    }

    function handleChecked(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = e.target.value;

        if(e.target.checked){
            let filtered = activity.category.filter(v => v !== value );
            filtered.push(value);
            activity.category = filtered;
        } else {
            let filtered = activity.category.filter(v => v !== value);
            activity.category = filtered;
        }
        activity.category.length < 2 ? errors.errCategory = 'Välj minst en kategori!': errors.errCategory = '';

        if(!errors.errCategory) {
            setCheckboxValid(true)
        } else {
            setCheckboxValid(false);
            setFormValid(false);
        }  
        setActivity({category: activity.category} as any);
    }

    function showForm() {
        let mounted = true;
            firestore
            .collection('activities').orderBy('ID')
            .onSnapshot((snapshot) => {
                setActivities(snapshot.docs.map((doc: any) => ({
                    id: doc.id,
                    ...doc.data()
                    })
                ))
            })
            if(mounted){
                setDataCollected(true);
            }
        setActivityFormRender(true);
        setActivity({category: ['alla']} as any);
    }

    if(inputsValid && checkBoxValid){
        setIsCreated(true);
        setFormValid(true);
        setInputsValid(false);
        setCheckboxValid(false);
    } 

    if(activities.length >= 1 && dataCollected) {
        addId();
        setDataCollected(false);
    } 
    
    return(
        <>
        {!activityFormRender ? <button type='button' className="saveBtn" onClick={showForm}>Skapa något nytt!</button> : <form id='add-activity-form' >
            <fieldset>
                <div>                     
                    <div className="inputSection">
                        <label htmlFor="activityTitle"><p>TITEL</p> </label>
                        <input type="text" name="title" className="activity-input inputTitle" value={activity.title} onChange={handleChange}/>
                        <p className="errorMessages">{errors.errTitle}</p>
                    </div>

                    <div className="inputSection">
                        <label htmlFor="activityDescr"><p>BESKRIVNING</p> </label>                    
                        <input type="text" name="description" className="activity-input inputDesc" value={activity.description} onChange={handleChange}/>
                        <p className="errorMessages">{errors.errDescription}</p>
                    </div>
                    <div className="inputSection">
                        <label htmlFor="activityLink"><p>LÄNK</p> </label>
                    <input type="text" name="link" className="activity-input inputLink" value={activity.link} onChange={handleChange}/>
                    </div>                    
                </div>
            </fieldset>
            <fieldset>
                <div>
                <p>{errors.errCategory} </p>
                    <div id="categoryDiv">
                       <div>
                           <div>
                               <input type="checkbox" name="category" value="inomhus" className="category-checkbox"  onChange={handleChecked}/>
                           </div>
                           <div>
                               <label htmlFor="indoor" className="check-label" >
                            <span className="span-checkbox"></span>
                                <p>INOMHUS</p>
                            </label>
                           </div> 
                       </div>
                        <div>
                            <div>
                                <input type="checkbox" name="category" value="utomhus" className="category-checkbox" onChange={handleChecked}/>
                            </div>
                            <div>
                                <label htmlFor="outdoor" className="checkbox-label">
                                <p>UTOMHUS</p>
                            </label>
                            </div>  
                        </div>                        
                        <div>
                            <div>
                                <input type="checkbox" name="category" value="baka" className="category-chekbox" onChange={handleChecked}/>
                            </div>
                            <div>
                                <label htmlFor="baking" className="checkbox-label">
                                <p>BAKA</p>
                            </label> 
                            </div>                           
                        </div>
                    </div>   
                </div> 
            </fieldset>       
            <button type="button" className="saveBtn" disabled={!formValid} onClick={createActivity}>Skicka till Databas</button>
        </form>}
        </>
    )
}