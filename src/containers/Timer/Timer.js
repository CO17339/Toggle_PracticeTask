import React, {useState, useEffect, useRef} from 'react';
import axios from '../../axios-data';
import Header from '../../components/header/header';
import Modal from '../../components/Modal/Modal';
import AddProject from '../../Forms/AddProject';
import '../../styling/ui.scss';
import '../../styling/head.scss';
import TimerTable from './timerTable';
import Background from '../../components/Weather/Background';
import ErrorMessage from '../../components/ErrorHandler/timerError';
import "firebase/database";
import Firebase from '../../Firebase';

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
            time_spent: 0,
            time_spent_display: ""
        }        
        axios.post('./projects.json', post)
            .then(updateProjectName(""))
            .then(updateClientName(""))
            .then(updateBeingAdded(false))
            .then(res => console.log(res.data))
            .catch(error => console.log(error.message));
    }

    //Fetching the projects
    const [ projectList, updateProjectList] = useState([]);

    useEffect(async () => {
        const result = await axios(
        'https://togglttrack-default-rtdb.firebaseio.com/projects.json',
        );
        updateProjectList(result.data);
    },[onClickhandler]);

    const list = []
        for(var i in projectList){
            list.push(projectList[i].project);
        }

    const [timeList, updateTimeList] = useState(0)


//Time Management
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    //const [isProject, setIsProject] = useState(false);
    const countRef = useRef(null)

    var k = -1;
    const handleStart = () => {
        for(var i in projectList){
            if(project === projectList[i].project)
            {
                k = i;
                setIsActive(true)
                setIsPaused(true)
                countRef.current = setInterval(() => {
                    setTimer((timer) => timer+1)
                    }, 1000)
            }
        }   
    }

    var count;
    var time_spent_initial;
    const handlePause = () => {
        clearInterval(countRef.current)
        setIsPaused(false)

        for(var i in projectList){
            if(project === projectList[i].project){
                time_spent_initial = projectList[i].time_spent
                count = i;
                console.log(count)
                break;
            }
        }

        const seconds = `0${((time_spent_initial + timer) % 60)}`.slice(-2)
        const minutes = `${Math.floor((time_spent_initial + timer) / 60)}`
        const getminutes = `0${minutes % 60}`.slice(-2)
        const hours = `0${Math.floor((time_spent_initial + timer) / 3600)}`.slice(-2)

        axios.put(`https://togglttrack-default-rtdb.firebaseio.com/projects/`+ count +`.json`, {
            project: projectList[i].project,
            client: projectList[i].client,
            date_started: projectList[i].date_started,
            time_spent: time_spent_initial + timer,
            time_spent_display: `${hours} : ${getminutes} : ${seconds}`
         }).then(response => {
            console.log(response);
          })
          .catch(err => {
            console.log(err);
          });
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



//Project name
    //const [ errorMessage, setErrorMessage] = useState(false);

    const [ project, updateProject ] = useState("");
    const [ isProjectActive, setIsProjectActive] = useState(false);
    const onInputChangeHandler = (event) => {
        updateProject(event.target.value);
        setIsProjectActive(true);
    }

    //Rendering table

    const data_list = []
        for(var i in projectList){
            data_list.push(projectList[i]);
        }

    const info =  data_list.map(display => {
        return (
            <tr key = {display.project}>
                <td>{display.project}</td>
                <td>{display.client}</td>
                <td>{display.date_started}</td>
                <td>{display.time_spent_display}</td>
            </tr>
        );
    });

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
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Projects</th>
                                <th>Clients</th>
                                <th>Date Started</th> 
                                <th>Time Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {info}
                        </tbody>
                    </table>
                </div>
                </section>
            </Background>
        </div>
    );
};

export default Timer;