import React from 'react';

import '../../../styling/ui.scss';

const button = props => {
    return(
        <button className="button_trivial" onClick = {props.onClick}>
            {props.children}
        </button>
    );
}

export default button;