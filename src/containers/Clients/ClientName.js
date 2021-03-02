import React from 'react';
import ellipsis from '../../assets/images/ellipsis.png';

const ClientName = (props) => {
    return(
        <span>
            <p>
                {props.name}
            </p>
            <img src={ellipsis}>
            </img>
        </span>
    );
}

export default ClientName;