import React, {useState} from 'react';
import axios from '../../axios-data';

import Header from '../../components/header/header';
import Button from '../../components/UI/Button/Button';

import AddProject from '../../Forms/AddProject';
import '../../styling/head.scss';
import Modal from '../../components/Modal/Modal';
import Background from '../../components/Weather/Background';


const Project = () => {

//Adding a project
    const [beingAdded, updateBeingAdded] = useState(false);
    const [projectName, updateProjectName]= useState("");
    const [clientName, updateClientName] = useState("");

    const onChangeHandler = (event) => {
        updateProjectName(event.target.value);
    }

    const onClientChangeHandler = (event) => {
        updateClientName(event.target.value);
    }

    const createNewProject = () => {
        updateBeingAdded(true);
    };
    
    const removeFormHandler = () => {
        updateBeingAdded(false);
    };  

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    //sending data to firebase
    const onClickhandler = () => {
        const post = {
            project: projectName,
            client: clientName,
            date_started: date,
            time_spent: 0,
            // seconds: 0,
            // minutes: 0,
            // hours: 0,
            // days: 0,
            time_spent_display: ""
        }        
        axios.post('./projects.json', post)
            .then(updateProjectName(""))
            .then(updateClientName(""))
            .then(updateBeingAdded(false))
            //.then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }
    //data sent to firebase
    
    return (
        <div>
            <Modal show={beingAdded} modalClosed={removeFormHandler}>
                <AddProject crossClicked={removeFormHandler}
                    projectName={projectName}
                    onChangeHandler={onChangeHandler}
                    clientName={clientName}
                    onClientChangeHandler={onClientChangeHandler}
                    onClickhandler={onClickhandler}
                    key = {projectName.id}/> 
            </Modal>
            <Header>
            <h3>Projects</h3>
                <Button onClick= {createNewProject}> + New Project</Button>
            </Header>
            <Background/>
        </div>
    );
};

export default Project;