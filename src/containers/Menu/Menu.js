import React from 'react';
import MenuItem from './Menu_Items/Menu_item';
import logo from '../../assets/images/logo.png';
import '../../styling/layout.scss';

const menu = (props) => {
    return(
        <nav>
            <img src = {logo} alt = "logo"/>
            <ul className="menu_list">
                <MenuItem link = '/' exact>Projects</MenuItem>
                <MenuItem link = '/client'>Clients</MenuItem>
                <MenuItem link = '/timer'>Timer</MenuItem>
            </ul>
        </nav>
        
    );
}

export default menu;