import React from 'react';

const Input = props => {

    let inputElement = null;

    switch(props.inputtype) {
        case('input'):
            inputElement = <input {...props}
            value = {props.value}
            onChange = {props.onChange}/>
            break;
        case('select'):
            inputElement = <select {...props}
            value = {props.value}
            onChange = {props.onChange}/>
            break;
        default:
            inputElement = <input {...props}
            value = {props.value}
            onChange = {props.onChange}/>
    }
    return(
        <div>
            {inputElement}    
        </div>
    );
}

export default Input;