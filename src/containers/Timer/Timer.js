import React, {useState, useEffect, useRef} from 'react';
import axios from '../../axios-data';
import Header from '../../components/header/header';
import Modal from '../../components/Modal/Modal';
import AddProject from '../../Forms/AddProject';
import '../../styling/ui.scss';
import '../../styling/head.scss';
import './timerTable';
import TimerTable from './timerTable';
import Background from '../../components/Weather/Background';
import ErrorMessage from '../../components/ErrorHandler/timerError';

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

//Time Management
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    //const [isProject, setIsProject] = useState(false);
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

//Fetching the projects
    const [ projectList, updateProjectList] = useState([]);

    useEffect(async () => {
        const result = await axios(
        'https://togglttrack-default-rtdb.firebaseio.com/projects.json',
        );
        updateProjectList(result.data);
    },[]);

    const list = []
        for(var i in projectList){
            list.push(projectList[i].project);
        }

//Project name
    //const [ errorMessage, setErrorMessage] = useState(false);

    const ableStartButton = (pro) => {
        for(var i in list)
        {
            if(pro===list[i])
            {
                setIsProjectActive(true);
                console.log("done");
            }
        }
    }

    const [ project, updateProject ] = useState("");
    const [ isProjectActive, setIsProjectActive] = useState(false);
    const onInputChangeHandler = (event) => {
        console.log("done");
        updateProject(event.target.value);
        setIsProjectActive(true);
    }

    const handleErrorMessage = () => {
        for(var i in list){
            if(project===list[i])
                return false
            else 
                return true
        }
        if(project==="")
            return false;
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
                    key = {projectName.id}/> 
            </Modal>
            <Header>
                <input 
                    id = "project_name"
                    className = "timer_input" 
                    value = {project} 
                    onChange = {(event) => onInputChangeHandler(event)}
                    placeholder = "What are you working on?">
                </input>

                <ErrorMessage className = "error" showMessage = {handleErrorMessage}/>

                <span className = "timer_project" onClick = {createNewProject} > 
                    <span className = "span_plus"> + </span>Create a Project
                </span>

                <div>
                    <span className="time">{displayTime()}</span>
                    <div className = "timer_buttons">
                        { !isActive && !isPaused 
                            ? <button onClick = {handleStart} 
                                    disabled = {!isProjectActive} 
                                    className="start">{">"}</button>
                            : ( isPaused 
                                    ? <button onClick = {handlePause} 
                                            className="pause">ll</button>
                                    : <button onClick = {handleResume} 
                                                className="start">{">"}</button>
                            )
                        }
                    </div>
                    <button className = "timer_reset" onClick = {handleReset} 
                        disabled = {!isActive}>Reset</button>           
                </div>
            </Header>
            <Background>
                <section>
                    <TimerTable/>
                </section>
            </Background>
        </div>
    );
};

export default Timer;