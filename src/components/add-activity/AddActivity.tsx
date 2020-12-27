
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
                <label htmlFor="activityTitle">TITEL</label>
                <input type="text" name="title" className="activity-input" onChange={handleChange}/>
                <label htmlFor="activityDescr">BESKRIVNING</label>
                <input type="text" name="description" className="activity-input" onChange={handleChange}/>
                <label htmlFor="activityLink">LÄNK</label>
                <input type="text" name="link" className="activity-input"onChange={handleChange}/>
            </fieldset>
            <fieldset>
                <p>Kategori</p>
                <input type="checkbox" name="category" value="inomhus" className="category-chekbox" onChange={handleChecked}/>
                <label htmlFor="indoor">INOMHUS</label>
                <input type="checkbox" name="category" value="utomhus" className="category-chekbox" onChange={handleChecked}/>
                <label htmlFor="outdoor">UTOMHUS</label>
                <input type="checkbox" name="category" value="baka" className="category-chekbox" onChange={handleChecked}/>
                <label htmlFor="baking">BAKA</label>
            </fieldset>
            <button type="button" onClick={createActivity}>SPARA</button>
        </form>
        </React.Fragment>
    )
}