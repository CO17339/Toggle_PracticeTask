import React from 'react';

import '../../styling/ui.scss';

const button = props => {
    return(
        <button onClick = {props.onClick}>
            {props.children}
        </button>
    );
}

export default button;