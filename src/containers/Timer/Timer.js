import React, {useState} from 'react';
import axios from '../../axios-data';
import Header from '../../components/header/header';
import Modal from '../../components/Modal/Modal';
import AddProject from '../../Forms/AddProject';

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

    const [timerOn, changeTimerOn] = useState(false);
    const [timerStart, changeTimerStart] = useState(0);
    const [timerTime, changeTimerTime] = useState(0);

    let timer = 0;

    const [resume, changeResume] = useState(true);
    let sign = <span className="resume"/>
    if(resume===false){
        sign=<span className="pause"/>
    }

    const startTimer = () => {
        changeTimerOn(true);
        //changeTimerTime({timerTime: timerTime})
        changeTimerStart({timerStart: Date.now() - timerTime});

        timer = setInterval(() => {
            changeTimerTime({timerTime: Date.now() - timerStart})
        }, 10)
    }

    const stopTimer = () => {
        changeTimerOn(false);
        clearInterval(timer);
    }

    const resetTimer = () => {
        changeTimerStart({timerStart: 0});
        changeTimerTime({timerTime: 0})
      };

    //const { timerTime } = this.state;
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

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
                <h3>Timer</h3>
                <span className = "timer_project" onClick = {createNewProject} > 
                    <span className = "span_plus"> + </span>Create a Project
                </span>
                <div>
                    <span className = "time">{hours}:{minutes}:{seconds}</span>

                    {timerOn === false && timerTime === 0 && (
                    <button onClick={startTimer} className="start">Start</button>
                    )}
                    {timerOn === true && (
                    <button onClick={stopTimer} className="stop">Stop</button>
                    )}
                    {timerOn === false && timerTime > 0 && (
                    <button onClick={startTimer} className="resume">Resume</button>
                    )}
                    {timerOn === false && timerTime > 0 && (
                    <button onClick={resetTimer} className="reset">Reset</button>
                    )}
                    
                </div>
            </Header>
        </div>
    );
};

export default Timer;