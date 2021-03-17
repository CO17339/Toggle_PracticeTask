import React, {useState, useEffect} from 'react';
import axios from '../../axios-data';
import Background from '../../components/Weather/Background';

import Button from '../../components/UI/Button/Button';
import AddClient from '../../Forms/AddClient';
import '../../styling/head.scss';
import Modal from '../../components/Modal/Modal';
import '../../styling/layout.scss';
import Header from '../../components/header/header';
import SearchClient from './SearchClient';
import ClientName from './DisplayClient/ClientName';

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

//updating clients on backend
    var count;
    var show;
    const deleteClient = (name) => {
        for(var i in clients){
            if(name === clients[i].value){
                count = i;
                console.log(count)
                break;
            }
        }
        axios.delete(`https://togglttrack-default-rtdb.firebaseio.com/clients/`+ count +`.json`)
        .then(res => console.log("xyz",res))
        .catch(err => console.log(err.message));
    }
    const [newName, updateNewName] = useState("");
    const onNameChangeHandler = (event) => {
        updateNewName(event.target.value);
    }
    const editClient = (name) => {
        for(var i in clients){
            if(name === clients[i].value){
                count = i;
                console.log(count)
                break;
            }
        }

        axios.put(`https://togglttrack-default-rtdb.firebaseio.com/clients/`+ count +`.json`, {
            value: newName
         }).then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
    }
    

    
//add name of client
    const [nameValue, updateValue]= useState(""); 

    const onClickhandler = () => {
        const post = {
            value: nameValue
        }        
        axios.post('./clients.json', post)
            .then(updateBeingAdded(false))
            .then(updateValue(""))
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
    },[deleteClient]);
    //console.log(Object.keys(clients))

    const list = []
    for(var i in clients){
        list.push(clients[i].value);
    }

    const filteringClients = list.filter(client => {
        return client.toLowerCase()
        .includes(inputValue.toLowerCase());
    })  
//finding clients done
    
    
// rendering the clients onscreen
    const clients_list = filteringClients.map(display => {
        return (
            <ClientName key = {display} 
                name = {display}
                deleteClient = {() => deleteClient(display)}
                editClient = {() => editClient(display)}
                onNameChangeHandler = {onNameChangeHandler}>
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
            <Background>
            <section>
                <p className="bord_bot">All</p>
                <hr/>
                <div className="dis_cli">
                    {clients_list}
                </div>
            </section>
            </Background>
        </div>
    );
    
    
};

export default Client;