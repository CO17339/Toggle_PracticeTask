import React from 'react';
import '../../styling/error.scss';

const ErrorMessage = (props) => (
    props.showMessage === true ? <div className = "TimerError"> The project does not exists!! </div> : null
)


export default ErrorMessage;