import React, {useState} from 'react';
import axios from '../../axios-data';

import Button from '../../components/UI/Button/Button';
import AddClient from '../../Forms/AddClient';
import '../../styling/head.scss';
import Modal from '../../components/Modal/Modal';
import '../../styling/layout.scss';
import DisplayClient from './DisplayClient/DisplayClients';
import UpdateClients from './UpdateClients';
import Header from '../../components/header/header';
import SearchClient from './SearchClient';

const Client = (props) => {
    
    const [beingAdded, updateBeingAdded] = useState(false); //to display the form

    const addNewClientHandler = () => {
        updateBeingAdded(true);
    };
    
    const removeFormHandler = () => {
        updateBeingAdded(false);
    };  

    const [nameValue, updateValue]= useState(""); //name of client

    const onClickhandler = () => {
        const post = {
            value: nameValue
        }        
        axios.post('./clients.json', post)
            .then(updateBeingAdded(false))
            .then(updateValue(""))
            .then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }

    const onChangeHandler = (event) => {
        updateValue(event.target.value);
    }

    const [inputValue, updateInputValue] = useState("");
    const filterClientsOnChange = (event) => {
        updateInputValue(event.target.value)
    }

    
    
    return (
        <div>
            <Modal show={beingAdded} modalClosed={removeFormHandler}>
                <AddClient crossClicked={removeFormHandler}
                    nameValue = {nameValue}
                    onChangeHandler = {onChangeHandler}
                    onClickhandler = {onClickhandler}/> 
            </Modal>
            <Header>
                <h3>Clients</h3>
                <SearchClient className= "Search" inputValue={inputValue}
                filterClientsOnChange={filterClientsOnChange}/>
                <Button onClick= {addNewClientHandler}> + New Client</Button>
            </Header>
            <section>
                <p className="bord_bot">All</p>
                <hr/>
                <DisplayClient/>
            </section>
        </div>
    );
    
    
};

export default Client;