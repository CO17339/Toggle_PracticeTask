import React from 'react';
import ellipsis from '../../../assets/images/ellipsis.png';
import '../../../styling/ui.scss';


const ClientName = (props) => {

    return(
        
            <p className = "p_cli">
                {props.name}
                <img onClick = {props.updateClientHandler} src={ellipsis} alt=""/>
                {props.children}
            </p>  
    );
}

export default ClientName;