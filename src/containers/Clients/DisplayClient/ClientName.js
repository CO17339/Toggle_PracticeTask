import React, {useState} from 'react';
import ellipsis from '../../../assets/images/ellipsis.png';
import '../../../styling/ui.scss';
import UpdateClients from '../UpdateClients';


const ClientName = (props) => {

    const [clientStatus, updateClientStatus] = useState(false);
    let show = null;

    const updateClientHandler = () => {
        updateClientStatus(true)
    };

    if (clientStatus===true){
        show = <UpdateClients 
        editClient = {props.editClient}
        deleteClient = {props.deleteClient}/>
    }

    return(
        <div className = "display_clients">
            <p className = "p_cli">
                {props.name}
                <img onClick = {updateClientHandler} src={ellipsis} alt=""/>
                {props.children}
            </p>
            {show}
        </div>  

        
    );
}

export default ClientName;