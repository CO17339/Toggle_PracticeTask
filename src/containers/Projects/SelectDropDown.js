import React from 'react';
import '../../styling/p_form.scss';

const SelectDropDown = props => {
    return (
        <div className="dropdown">
            <input type = "text" placeholder="Find Client"/>
            {props.children}
            <div>
                <button onClick={props.addClient}>Add New client +</button>
            </div>
        </div>
    );
}

export default SelectDropDown;