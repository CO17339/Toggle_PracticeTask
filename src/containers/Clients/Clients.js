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
import firebase from 'firebase/app';

const Client = (props) => {
    
//to display the form
    const [beingAdded, updateBeingAdded] = useState(false); 

    const addNewClientHandler = () => {
        updateBeingAdded(true);
    };
    
    const removeFormHandler = () => {
        updateBeingAdded(false);
    }; 
// forms end

//add name of client
    const [nameValue, updateValue]= useState(""); 

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
//name of client done

//finding the client
    const [inputValue, updateInputValue] = useState("");
    const filterClientsOnChange = (event) => {
        updateInputValue(event.target.value)
    }

    const [clients, updateClients] = useState([]);

    useEffect(async () => {
        const result = await axios(
        'https://togglttrack-default-rtdb.firebaseio.com/clients.json',
        );
        updateClients(result.data);
    },[]);

    const list = []
    for(var i in clients){
        list.push(clients[i].value);
    }

    const filteringClients = list.filter(client => {
        return client.toLowerCase()
        .includes(inputValue.toLowerCase());
    })  
//finding clients done

//updating clients on backend
    //var tutorialsRef = firebase.database().ref("/clients");
    const editClient = () => {

    }

    const deleteClient = (display) => {

       // return firebase.database().ref('items').child('ITEM_KEY').remove();

      //tutorialsRef.child(key).remove();

        // axios.delete(`https://togglttrack-default-rtdb.firebaseio.com/${display}.json`)
        // .then(res => console.log("xyz",res))
        // .catch(err => console.log(err.message));

        // axios.delete("/clients/" + id + ".json")
        // .then(res => console.log("xyz",res))
        // .catch(err => console.log(err.message));

    }

// rendering the clients onscreen
    const clients_list = filteringClients.map(display => {
        return (
            <ClientName key = {display.id} 
                name = {display}
                deleteClient = {() => deleteClient()}
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
                    key = {nameValue.id}/> 
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