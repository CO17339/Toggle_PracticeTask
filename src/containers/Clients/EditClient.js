import React from 'react';
import '../../styling/ui.scss';

const EditClient = (props) => (
        props.show === true ? <div className = "editClient">
            <input type = "text"/>
        </div> : null
)

export default EditClient;