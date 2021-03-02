import React from 'react';
import '../../styling/backdrop.scss';


const backdrop = (props) => (
    props.show === true ? <div className="back_div" onClick={props.clicked}></div> : null
)

export default backdrop;