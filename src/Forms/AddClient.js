import React, {useState} from 'react';
import axios from '../axios-data';
import '../styling/form.scss';
import cross from '../assets/images/cross.jpg';
import Input from '../Forms/Input';

const ClientForm = props =>  {

    const [nameValue, updateValue]= useState("");

    const onClickhandler = () => {
        const post = {
            value: nameValue
        }        
        axios.post('./clients.json', post)
            .then(updateValue(""))
            .then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }

    const onChangeHandler = (event) => {
        updateValue(event.target.value);
    }
    return (
        <div className="form_div">
            <h4>New Client 
                <img src={cross} onClick={props.crossClicked} className="crs"></img>
            </h4>
            <form>
                <Input inputtype = "input"
                    className = "c_name" type = "text" 
                    value= {nameValue} placeholder="Client Name..."
                    onChange = {(event) => onChangeHandler(event)}/>
                <br></br>
                <Input inputtype = "input" type="button"  value="Create"
                className="c_btn" onClick={onClickhandler}>
                </Input>
            </form>
            
        </div>
    );

}

export default ClientForm;