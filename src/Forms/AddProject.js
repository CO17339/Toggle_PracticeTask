import React, {useState, useEffect} from 'react';
import axios from '../axios-data';
import '../styling/p_form.scss';
import cross from '../assets/images/cross.jpg';
import SelectDropDown from '../containers/Projects/SelectDropDown';

const AddProject = (props) => {   

    const [clients, updateClients] = useState([]);
   // const [showDropDown, updateDropDown] = useState(false);
   // const [clientName, updateClientName] = useState("");

    useEffect(async () => {
        const result = await axios(
          'https://togglttrack-default-rtdb.firebaseio.com/clients.json',
        );
        updateClients(result.data);
    }, []);

    const list = []
    for(var i in clients){
        list.push(clients[i].value);
    }

    const clients_list = list.map(display => {
        return (
            <option className= "option_clients" 
                key = {display}
                onClick = {props.selectClient} 
                value = {display}>{display}
            </option>
        );
    });

    const selectClient = (name) => {
        document.getElementById("clientName").innerHTML = name;
    }

    // const clients_list = list.map(display => {
    //     return (
    //         <p className= "option_clients" 
    //             key = {display}
    //             onClick = {selectClient(display)}>
    //             {display}
    //         </p>
    //     );
    // });


    const onClickSelectHandler = () => {
        <SelectDropDown>
            {clients_list}
        </SelectDropDown>
    }

    // const onClientChangeHandler = (event) => {
    //     updateClientName(event.target.value);
    // }

    // const dropDownHandler = () => {
    //     if(showDropDown===true)
    //     updateDropDown(false)
    //     else
    //     updateDropDown(true)
    // }

    return(
        <div className="form_pdiv">
            <form>
                <h4>Create New Project
                    <img src={cross} onClick={props.crossClicked} alt = "" className="crs"></img>
                </h4>

                <input
                    className = "c_name" type = "text" 
                    value= {props.projectName} 
                    placeholder="Project Name..." onChange = {(event) => props.onChangeHandler(event)}/>

                <select type="text" className = "c_name"
                    onChange = {(event) => props.onClientChangeHandler(event)}>
                        <option>No Client</option>
                        {clients_list}
                </select>

                {/* <p id = "clientName" className = "cp_name" onClick = {onClickSelectHandler}>
                    No Client
                </p> */}
                        
                <input type="button"  value="Create"
                className="c_btn" onClick={props.onClickhandler}/>
            </form>
        </div>
    );

}

export default AddProject;