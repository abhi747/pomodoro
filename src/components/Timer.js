import React, { useEffect, useState, useRef } from "react";
import { padTime, getMinutes, getSeconds } from "./util/helper";

const Timer = ({
  timerLength,
  setTimerLength,
  sessionLength,
  breakLength,
  setSessionLength,
  setBreakLength,
}) => {
  const [isTimerRunnig, setIsTimerRunnig] = useState(false);
  const [timerTitle, setTimerTitle] = useState("Keep it Up!");
  let intervalRef = useRef(null);
  const isFirstRun = useRef(true);
  const audioRef = useRef(null);

  const isSessionMode =  useRef(true);

   useEffect(() => {
     if (isFirstRun.current) {
       isFirstRun.current = false;
       return;
     }    
     if (timerLength === 0) {
      audioRef.current.play().catch(console.log);
      if (isSessionMode.current) {
        setTimerLength(breakLength);
        isSessionMode.current = false;
        setTimerTitle("Keep it Up!");
      }else {
        setTimerLength(sessionLength);
        isSessionMode.current = true;
        setTimerTitle("You are doing great!");
      }
    }
   }, [isSessionMode, timerLength, sessionLength, breakLength, setTimerLength]);


  const startTimer = () => {
    if (intervalRef.current) {
      pauseTimer();
      setTimerTitle("Keep it Up!");
      return;
    }

    setIsTimerRunnig(true);
    setTimerTitle("You are doing great!");
    intervalRef.current = setInterval(() => {
      setTimerLength((prevTimerLength) => prevTimerLength - 1);
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
    isSessionMode.current = true;
    setTimerTitle("Ready to go another round?");
    setTimerLength(25 * 60);
    setSessionLength(25 * 60);
    setBreakLength(5 * 60);
  };

  return (
    <>
      <div id="timer-label" className="timerlabel">
        {timerTitle}
      </div>
      <div className="timer-wrapper">
        <span id="time-left" className="time-digits">
          <span>{padTime(getMinutes(timerLength))}</span>
            :
            <span>{padTime(getSeconds(timerLength))}</span>
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
