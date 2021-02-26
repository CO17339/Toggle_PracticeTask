import React from 'react';
import '../../styling/head.scss';

const header = props => {
    return (
        <header>
            {props.children}
        </header>
    );
}

export default header;