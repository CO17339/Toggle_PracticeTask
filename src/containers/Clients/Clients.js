import React, {useState, useEffect} from 'react';
import axios from '../../axios-data';

import Button from '../../components/UI/Button/Button';
import AddClient from '../../Forms/AddClient';
import '../../styling/head.scss';
import Modal from '../../components/Modal/Modal';
import '../../styling/layout.scss';
import Header from '../../components/header/header';
import SearchClient from './SearchClient';
import ClientName from './DisplayClient/ClientName';
import 'firebase/database';


const Client = (props) => {
    
    const [beingAdded, updateBeingAdded] = useState(false); //to display the form

    const addNewClientHandler = () => {
        updateBeingAdded(true);
    };
    
    const removeFormHandler = () => {
        updateBeingAdded(false);
    };  // forms end

    const [nameValue, updateValue]= useState(""); //add name of client

    const onClickhandler = () => {
        const post = {
            value: nameValue
        }        
        axios.post('./clients.json', post)
            .then(updateBeingAdded(false))
            .then(updateValue(""))
         //   .then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }

    const onChangeHandler = (event) => {
        updateValue(event.target.value);
    } //name of client done

    //finding the client
    const [inputValue, updateInputValue] = useState("");
    const filterClientsOnChange = (event) => {
        updateInputValue(event.target.value)
    }

    const [clients, updateClients] = useState([]);
    //const [clientStatus, updateClientStatus] = useState(false);

    useEffect(async () => {
        const result = await axios(
        'https://togglttrack-default-rtdb.firebaseio.com/clients.json',
        );
        updateClients(result.data);
    }, [onClickhandler]);

    const list = []
    for(var i in clients){
        list.push(clients[i].value);
    }

    const filteringClients = list.filter(clients => {
        return clients.toLowerCase()
        .includes(inputValue.toLowerCase());
    })

    const editClient = () => {

    }

    const deleteClient = (id) => {

        axios.delete(`https://togglttrack-default-rtdb.firebaseio.com/clients${id}.json`)
        .then(res => console.log(res))
        .catch(err => console.log(err.message));
    }

    const clients_list = filteringClients.map(display => {
        return (
            <ClientName key = {display.id} 
                name = {display}
                deleteClient = {deleteClient(display.id)}
                editClient = {editClient}>
            </ClientName>
        );
    });
    
    return (
        <div>
            <Modal show={beingAdded} modalClosed={removeFormHandler}>
                <AddClient crossClicked={removeFormHandler}
                    nameValue = {nameValue}
                    onChangeHandler = {onChangeHandler}
                    onClickhandler = {onClickhandler}
                    key = {beingAdded.id}/> 
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
                <div className="dis_cli">
                    {clients_list}
                </div>
            </section>
        </div>
    );
    
    
};

export default Client;