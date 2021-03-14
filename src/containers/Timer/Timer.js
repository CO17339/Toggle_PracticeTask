import React, {useState, useRef} from 'react';
import axios from '../../axios-data';
import Header from '../../components/header/header';
import Modal from '../../components/Modal/Modal';
import AddProject from '../../Forms/AddProject';
import '../../styling/ui.scss';
import './Timer_table';
import Timer_table from './Timer_table';
import Time from './Time';

const Timer = props => {
 
    //Adding new Project
    const [beingAdded, updateBeingAdded] = useState(false);
    const [projectName, updateProjectName]= useState("");
    const [clientName, updateClientName] = useState("");

    const createNewProject = () => {
        updateBeingAdded(true);
    };

    const onChangeHandler = (event) => {
        updateProjectName(event.target.value);
    }

    const onClientChangeHandler = (event) => {
        updateClientName(event.target.value);
    }

    const removeFormHandler = () => {
        updateBeingAdded(false);
    }; 

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const onClickhandler = () => {
        const post = {
            project: projectName,
            client: clientName,
            date_started: date,
            time_spent: ""
        }        
        axios.post('./projects.json', post)
            .then(updateProjectName(""))
            .then(updateClientName(""))
            .then(updateBeingAdded(false))
            .then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }

//Project name
    const [ project, updateProject ] = useState("");
    const onInputChangeHandler = (event) => {
        updateProject(event.target.value);
    }

    // Connecting timer to project
    // if (project==="")
    //     setIsProject(false)
    // else
    //     setIsProject(true)

    

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
                <input 
                    className = "timer_input" 
                    value = {project} 
                    onChange = {(event) => onInputChangeHandler(event)}
                    placeholder = "What are you working on?">
                </input>

                <span className = "timer_project" onClick = {createNewProject} > 
                    <span className = "span_plus"> + </span>Create a Project
                </span>

                <Time/>
            </Header>
            <section>
                <Timer_table/>
            </section>
        </div>
    );
};

export default Timer;