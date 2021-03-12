import React, {useState, useEffect, useRef} from 'react';
import ellipsis from '../../../assets/images/ellipsis.png';
import '../../../styling/ui.scss';
import UpdateClients from '../UpdateClients';

const ClientName = (props) => {

    const [isComponentVisible, setIsComponentVisible] = useState(false);
    const ref = useRef(null);

    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
    });

    let show = null;

    const updateClientHandler = () => {
        setIsComponentVisible(true)
    };

    if (isComponentVisible===true){
        show = <UpdateClients 
        editClient = {props.editClient}
        deleteClient = {props.deleteClient}/>
    }

    return(
        
        <div ref = {ref} className = "display_clients">
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

