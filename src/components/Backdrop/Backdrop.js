import React from 'react';
import '../../styling/backdrop.scss';


const backdrop = (props) => (
    props.show ? <div onClick={props.clicked}></div> : null
)

export default backdrop;