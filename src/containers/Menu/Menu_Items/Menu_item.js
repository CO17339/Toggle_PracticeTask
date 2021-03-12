import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../styling/layout.scss';

const menuItem = (props) => {
    return (
        <li className="item_list">
            <NavLink  className="menu_item" to={props.link} exact={props.exact}>
                {props.children}
            </NavLink>
        </li>
    );
    
}

export default menuItem;