import React from 'react';
import '../styling/form.scss';
import cross from '../assets/images/cross.jpg';

const ClientForm = props =>  {
    
    return (
        <div className="form_div">
            <form>
                <h4>New Client 
                    <img src={cross} onClick={props.crossClicked} 
                    alt = "" className="crs"></img>
                </h4>
                <input
                    className = "c_name" type = "text" key = {props.key}
                    value= {props.nameValue} placeholder="Client Name..."
                    onChange = {(event) => props.onChangeHandler(event)}/>
                <input type="button"  value="Create"
                className="c_btn" onClick={props.onClickhandler}>
                </input>
            </form>
            
        </div>
    );

}

export default ClientForm;