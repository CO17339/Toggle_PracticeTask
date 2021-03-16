import React from 'react';
import '../../styling/ui.scss';
import EditClient from './EditClient';

const UpdateClient = (props) => {

    return (
        <div className="update_div">
            <p onClick = {props.editClient} className="edit">Edit</p>
            <p onClick = {props.deleteClient} className="delete">Delete</p>
            <EditClient show = {props.show}/>
        </div>
        
    );
}

export default UpdateClient;


