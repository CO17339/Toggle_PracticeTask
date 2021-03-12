import React, {useState, useRef} from 'react';
import axios from '../../axios-data';
import Header from '../../components/header/header';
import Modal from '../../components/Modal/Modal';
import AddProject from '../../Forms/AddProject';
import '../../styling/ui.scss';

const Timer = props => {

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

    const onClickhandler = () => {
        const post = {
            project: projectName,
            client: clientName
        }        
        axios.post('./projects.json', post)
            .then(updateProjectName(""))
            .then(updateClientName(""))
            .then(updateBeingAdded(false))
            .then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }

    const addNewClient = () => {
        
    }

//Timer
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const countRef = useRef(null)

    const handleStart = () => {
        setIsActive(true)
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer+1)
        }, 1000)
    }

    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false)
    }

    const handleResume = () => {
        setIsPaused(true)
        countRef.current = setInterval(() => {
            setTimer((timer) => timer + 1)
        }, 1000)
    }

    const handleReset = () => {
        clearInterval(countRef.current)
        setIsActive(false)
        setIsPaused(false)
        setTimer(0)
    }

    const displayTime = () => {
        const seconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getminutes = `0${minutes % 60}`.slice(-2)
        const hours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${hours} : ${getminutes} : ${seconds}`
    }

    const [ project, updateProject ] = useState("");
    const onInputChangeHandler = (event) => {
        updateProject(event.target.value);
    }

    return (
        <div>
            <Modal show={beingAdded} modalClosed={removeFormHandler}>
                <AddProject crossClicked={removeFormHandler}
                    projectName={projectName}
                    onChangeHandler={onChangeHandler}
                    clientName={clientName}
                    onClientChangeHandler={onClientChangeHandler}
                    onClickhandler={onClickhandler}
                    addNewClient = {addNewClient}
                    key = {projectName.id}/> 
            </Modal>
            <Header>
                <input className = "timer_input" value = {project} onChange = {(event) => onInputChangeHandler(event)}
                placeholder = "What are you working on?"></input>
                <span className = "timer_project" onClick = {createNewProject} > 
                    <span className = "span_plus"> + </span>Create a Project
                </span>
                <div>
                    <span className="time">{displayTime()}</span>
                    <div className = "timer_buttons">
                        {
                            !isActive && !isPaused ? 
                                <button onClick = {handleStart} className="start">{">"}</button>
                                : (
                                    isPaused ? <button onClick = {handlePause} className="pause">ll</button>
                                    : <button onClick = {handleResume} className="start">{">"}</button>
                                )
                        }
                    </div>
                    <button className = "timer_reset" onClick = {handleReset} disabled = {!isActive}>Reset</button>           
                </div>
            </Header>
            <section>
                
            </section>
        </div>
    );
};

export default Timer;