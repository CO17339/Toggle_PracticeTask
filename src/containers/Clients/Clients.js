import React, {useState} from 'react';

import Button from '../../components/UI/Button/Button';
import AddClient from '../../Forms/AddClient';
import '../../styling/head.scss';
import Modal from '../../components/Modal/Modal';
import SearchClient from './SearchClient';
import '../../styling/layout.scss';
import DisplayClient from './DisplayClients';

const Client = (props) => {

    const [beingAdded, updateBeingAdded] = useState(false); 

    const addNewClientHandler = () => {
        updateBeingAdded(true);
    };
    
    const removeFormHandler = () => {
        updateBeingAdded(false);
    }
    
    return (
        <div>
            <Modal show={beingAdded} modalClosed={removeFormHandler}>
                <AddClient crossClicked={removeFormHandler} formRemove={removeFormHandler}/> 
            </Modal>
            <header>
                <h3>Clients</h3>
                <SearchClient className= "Search"/>
                <Button onClick= {addNewClientHandler}> + New Client</Button>
            </header>
            <section>
                <p>All</p>
                <hr/>
                <DisplayClient/>
            </section>
        </div>
    );
    
    
};

export default Client;