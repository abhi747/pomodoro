import React, {  useState } from 'react';
import TimerModesControls from './components/TimerModesControls';
import Timer from './components/Timer';
import './App.css';

const App = () => {
  const [sessionLength, setSessionLength] = useState(25*60);
  const [breakLength, setBreakLength] = useState(5*60);
  const [timerLength, setTimerLength] = useState(sessionLength);

  const incrementLength = (mode) => {
    if (mode === "break" && breakLength < 60 * 60) {
      setBreakLength(breakLength + 60);
    } else if (sessionLength < 60 * 60) {
      setSessionLength(sessionLength + 60);
      setTimerLength(sessionLength + 60);
    }
  };

  const decrementLength = (mode) => {
    if (mode === "break" && breakLength > 60) {
      setBreakLength(breakLength - 60);
    } else if (mode === "session" && sessionLength > 60) {
      setSessionLength(sessionLength - 60);
      setTimerLength(sessionLength - 60);
    }
  };

  return (
    <div className="container">
      <h1>Pomodoro</h1>
      <TimerModesControls
        {...{
          sessionLength,
          breakLength,
          incrementLength,
          decrementLength
        }}
      />
      <Timer
        {...{
          timerLength,
          setTimerLength,
          sessionLength,
          breakLength,
          setSessionLength,
          setBreakLength
        }}
      />
    </div>
  );
};

export default App;
