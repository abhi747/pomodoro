import React, { useEffect, useState, useRef } from 'react';
import { padTime, getMinutes, getSeconds } from './util/helper';

const Timer = ({
    timerLength,
    setTimerLength,
    sessionLength,
    breakLength,
    setSessionLength,
    setBreakLength
  }) => {
    const [isSessionMode, setIsSessionMode] = useState(true);
    const [isTimerRunnig, setIsTimerRunnig] = useState(false);
    let intervalRef = useRef(null);
    const isFirstRun = useRef(true);
    const audioRef = useRef(null);
  
    useEffect(() => {
      console.log(isSessionMode)
      if (isFirstRun.current) {
        isFirstRun.current = false;
        return;
      }
      audioRef.current.play();
    }, [isSessionMode, audioRef]);
  
     if (timerLength === -1)
       isSessionMode ? setTimerLength(breakLength) : setTimerLength(sessionLength);
  
    const startTimer = () => {
      if (intervalRef.current) {
        pauseTimer();
        return;
      }
  
      setIsTimerRunnig(true);
      intervalRef.current = setInterval(() => {
        setTimerLength((prevTimerLength) => {
          if (prevTimerLength > 0) return prevTimerLength - 1;
          setIsSessionMode((prev) => !prev);
          return -1;
        });
      }, 1000);
    };
  
    const pauseTimer = () => {
      if (intervalRef.current === null) return;
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTimerRunnig(false);
    };
  
    const stopAudio = () => {
      if (!(audioRef.current.paused || audioRef.current.ended)) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  
    const resetTimer = () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTimerRunnig(false);
      stopAudio();
      setIsSessionMode(true);
      setTimerLength(25 * 60);
      setSessionLength(25 * 60);
      setBreakLength(5 * 60);
    };

    return (
      <>
        <div id="timer-label" className="timerlabel">
          {isSessionMode ? "Session" : "Break"}
        </div>
        <div className="timer-wrapper">
          <span id="time-left" className="time-digits">
            {padTime(getMinutes(timerLength)) +
              ":" +
              padTime(getSeconds(timerLength))}
          </span>
        </div>
        <div className="controls-wrapper">
          <i
            id="start_stop"
            className={`fas controls ${!isTimerRunnig ? "fa-play" : "fa-pause"}`}
            onClick={startTimer}
          ></i>
          <i
            id="reset"
            className="fas fa-sync-alt controls"
            onClick={resetTimer}
          ></i>
        </div>
  
        <audio
          ref={audioRef}
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        ></audio>
      </>
    );
  };

  export default Timer;