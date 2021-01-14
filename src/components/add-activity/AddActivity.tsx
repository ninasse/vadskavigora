import React, { ChangeEvent, useReducer, useState } from 'react';
import firebase from '../../firebase';
import Activity from '../../models/Activity';
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
    
    
    function addId() {
        let lastActivity : Activity = activities[activities.length -1];
        setActivityId(lastActivity.ID +1);
        console.log(activities);
    } 
 
    function resetForm() {
         Array.from(document.querySelectorAll("input")).forEach(
          // eslint-disable-next-line no-sequences
          input => (input.value = "", input.checked = false )
        );
    }

    function createActivity() {
        props.addActivity(activity, isCreated);
        resetForm();
        setActivityFormRender(false);
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        setActivity({[name]: value, ID: activityId} as any);
    }

    function handleChecked(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = e.target.value;
       
        if(e.target.checked){
            let filtered = activity.category.filter(v => v !== value);
            filtered.push(value);
            activity.category = filtered;
            console.log(filtered);

        } else {
           let filtered = activity.category.filter(v => v !== value);
           activity.category = filtered;
           console.log(filtered);
        }
        setIsCreated(true);
        setActivity({category: activity.category} as any)
    }

    function showForm() {
        let mounted = true;
            firebase
            .firestore()
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
        setActivity({category: []} as any);
    }

    if(activities.length >= 1 && dataCollected) {
        addId();
        setDataCollected(false);
    } 
    
    return(
        <React.Fragment>
        {!activityFormRender ? <button type='button' id="saveBtn" onClick={showForm}>Skapa något nytt!</button> : <form id='add-activity-form' >
            <fieldset>
                <div> 
                    <div className="inputSection">
                        <label htmlFor="activityTitle"><p>TITEL</p> </label>
                    <input type="text" name="title" className="activity-input inputTitle" onChange={handleChange}/>
                    </div>

                    <div className="inputSection">

                    <label htmlFor="activityDescr"><p>BESKRIVNING</p> </label>
                    <input type="text" name="description" className="activity-input inputDesc" onChange={handleChange}/>

                    </div>
                    <div className="inputSection">
                        <label htmlFor="activityLink"><p>LÄNK</p> </label>
                    <input type="text" name="link" className="activity-input inputLink" onChange={handleChange}/>
                    </div>
                    
                </div>
            </fieldset>


            <fieldset>
                <div>
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
            <button type="button" className="saveBtn" onClick={createActivity}>Skicka till Databas</button>
        </form>}

        </React.Fragment>
    )
}