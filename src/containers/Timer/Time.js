import React, {useState, useRef} from 'react';
import '../../styling/head.scss';
import '../../styling/ui.scss';

const Time = () => {
    const [timer, setTimer] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [isProject, setIsProject] = useState(false);
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

    return (
        <div>
            <span className="time">{displayTime()}</span>
            <div className = "timer_buttons">
                { !isActive && !isPaused 
                    ? <button onClick = {handleStart} 
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
    );
}

export default Time;