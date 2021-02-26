import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItem = (props) => {
    return (
        <li>
            <NavLink to={props.link} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    );
    
}

export default menuItem;