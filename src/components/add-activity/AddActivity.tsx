
import React, { ChangeEvent, useReducer, useState } from 'react';
import Activity from '../../models/Activity';
import './AddActivity.scss';

export interface IAddActivityProps {
    addActivity(act: Activity): void;
  }

export default function AddActivity(props: IAddActivityProps){
    const [activity, setActivity] = useReducer((state: Activity, newState: Activity) => ({ ...state, ...newState }),
    new Activity());
    const [isCreated, setIsCreated] = useState(false);

    function resetForm() {
         Array.from(document.querySelectorAll("input")).forEach(
          // eslint-disable-next-line no-sequences
          input => (input.value = "", input.checked = false )
        ); 
        setActivity(activity);
      };
 
    function createActivity() {
        console.log(activity);
        props.addActivity(activity)
        setIsCreated(true);
        resetForm();
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const { name, value } = e.target;
        setActivity({[name]: value} as any);
    }

    function handleChecked(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        const value = e.target.value;
        if(e.target.checked){
        let filtered = activity.category.filter(v => v !== value);
        filtered.push(value);
        activity.category = filtered;   

        } else {
           let filtered = activity.category.filter(v => v !== value);
           activity.category = filtered;
        }

    }

    return(
        <React.Fragment>
        <h1>AddAcitivity component</h1>
        <form id='add-activity-form' >
            <fieldset>
                <div>
                    <label htmlFor="activityTitle"><p>TITEL</p> </label>
                    <input type="text" name="title" className="activity-input" id="inputTitle" onChange={handleChange}/>

                    <label htmlFor="activityDescr"><p>BESKRIVNING</p> </label>
                    <input type="text" name="description" className="activity-input" id="inputDesc" onChange={handleChange}/>

                </div>

                <div>

                    <label htmlFor="activityLink"><p>LÄNK</p> </label>
                    <input type="text" name="link" className="activity-input" id="inputLink" onChange={handleChange}/>

                    <fieldset>
                        <p>Kategori</p>

                        <div id="categoryDiv">
                            <div><input type="checkbox" name="category" value="inomhus" className="category-chekbox" onChange={handleChecked}/>
                            <label htmlFor="indoor"><p>INOMHUS</p></label></div>
                            
                            <div><input type="checkbox" name="category" value="utomhus" className="category-chekbox" onChange={handleChecked}/>
                            <label htmlFor="outdoor"><p>UTOMHUS</p></label></div>
                            
                            <div><input type="checkbox" name="category" value="baka" className="category-chekbox" onChange={handleChecked}/>
                            <label htmlFor="baking"><p>BAKA</p></label></div>
                            
                </div>
                

                
            </fieldset>

                </div>
                
            </fieldset>
            
            <button type="button" id="saveBtn" onClick={createActivity}>Skicka till Databas</button>
        </form>
        </React.Fragment>
    )
}