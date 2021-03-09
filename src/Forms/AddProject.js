import React, {useState, useEffect} from 'react';
import axios from '../axios-data';
import '../styling/p_form.scss';
import cross from '../assets/images/cross.jpg';
import SelectDropDown from '../containers/Projects/SelectDropDown';

const AddProject = (props) => {   

    const [clients, updateClients] = useState([]);

    useEffect(async () => {
        const result = await axios(
          'https://togglttrack-default-rtdb.firebaseio.com/clients.json',
        );
        updateClients(result.data);
    }, []);

    const list = []
    for(var i in clients){
        list.push(clients[i].value);
        console.log(clients[i].value)
    }

    const clients_list = list.map(display => {
        return (
            <option onClick = {props.selectClient} value = {display}>{display}</option>
        );
    });

    return(
        <div className="form_pdiv">
            <form>
                <h4>Create New Project
                    <img src={cross} onClick={props.crossClicked} className="crs"></img>
                </h4>
                <input
                    className = "c_name" type = "text" 
                    value= {props.projectName} placeholder="Project Name..."
                    onChange = {(event) => props.onChangeHandler(event)}/>
                <select value = {props.clientName} placeholder="No Client..."
                    className = "c_name"
                    onChange = {(event) => props.onClientChangeHandler(event)} >
                        {clients_list}
                   </select>
                        
                
                <input type="button"  value="Create"
                className="c_btn" onClick={props.onClickhandler}/>
            </form>
        </div>
    );

}

export default AddProject;