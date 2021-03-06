import React from 'react';
import { getMinutes } from './util/helper';

const TimerModesControls = ({
    sessionLength,
    breakLength,
    incrementLength,
    decrementLength
  }) => (
    <div className="mode-wrapper">
      <div>
        <div id="break-label" className="label">
          Break Length
        </div>
        <div>
          <i
            id="break-decrement"
            className="fas fa-angle-down controls"
            style={{ marginLeft: "1rem" }}
            onClick={(_) => decrementLength("break")}
          ></i>
          <span id="break-length">{getMinutes(breakLength)}</span>
          <i
            id="break-increment"
            className="fas fa-angle-up controls"
            style={{ marginRight: "1rem" }}
            onClick={(_) => incrementLength("break")}
          ></i>
        </div>
      </div>
      <div>
        <div id="session-label" className="label">
          Session Length
        </div>
        <div>
          <i
            id="session-decrement"
            className="fas fa-angle-down controls"
            style={{ marginLeft: "1rem" }}
            onClick={(e) => decrementLength("session")}
          ></i>
          <span id="session-length">{getMinutes(sessionLength)}</span>
          <i
            id="session-increment"
            className="fas fa-angle-up controls"
            style={{ marginRight: "1rem" }}
            onClick={(e) => incrementLength("session")}
          ></i>
        </div>
      </div>
    </div>
  );

  export default TimerModesControls;