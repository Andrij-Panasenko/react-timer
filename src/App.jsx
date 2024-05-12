import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './index.css';
import { useRef, useState } from 'react';

const renderTime = ({ remainingTime }) => {
  const currentTime = useRef(remainingTime);
  const prevTime = useRef(null);
  const isNewTimeFirstTick = useRef(false);
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  // force one last re-render when the time is over to tirgger the last animation
  if (remainingTime === 0) {
    setTimeout(() => {
      setOneLastRerender((val) => val + 1);
    }, 20);
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? 'up' : ''}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? 'down' : ''}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isPlay, setIsPlay] = useState(false);
  const [durationTimer, setDurationTimer] = useState(0);

  const toggleTimer = () => {
    setIsPlay(!isPlay);
  };

  const submitTimer = (e) => {
    e.preventDefault();
    setDurationTimer(e.target.time.value);
    console.dir(e.target.time);

    isPlay ? (e.target.time.disabled = true) : (e.target.time.disabled = false);
  };

  return (
    <form onSubmit={submitTimer}>
      <div className="wrapper">
        <input
          placeholder="Set timer duration"
          type="number"
          name="time"
          className="input"
        />

        <CountdownCircleTimer
          isPlaying={isPlay}
          size={300}
          strokeWidth={10}
          duration={durationTimer}
          colors={['#3ffe00', '#F7B801', '#A30000', '#A30000']}
          colorsTime={[7, 5, 2, 0]}
        >
          {/* {({ remainingTime }) => remainingTime} */}
          {renderTime}
        </CountdownCircleTimer>

        <div className="button-wrapp">
          <button className="set-timer" type="submit" onClick={toggleTimer}>
            <span className="button_top"> {isPlay ? 'STOP' : 'SET'} </span>
          </button>
        </div>
      </div>
    </form>
  );
}
