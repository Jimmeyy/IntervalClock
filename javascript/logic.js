import selectors from './selectors';
import { fillInputs } from './helpers';
import validation from './validation';
// timers
import prepareTimer from './prepareTimer';
import warmupTimer from './warmupTimer';
import workTimer from './workTimer';

const logic = function () {
    const { btns, inputs } = selectors();
    fillInputs(inputs);
    let isPause = false;
    let isStart = false;

    let timerWarmup;
    let timerPrepare;
    let timerWork;
    let timerRest;

    // Handle start click
    function handleStartClick(event) {
        event.preventDefault();
        if (!validation()) {
            if (!isStart) {
                timerWork = workTimer();
                timerWarmup = warmupTimer(timerWork);
                timerPrepare = prepareTimer(timerWarmup);
                timerPrepare.start();
                isStart = true;
            } else {
                timerPrepare.isPaused && timerPrepare.start();
                timerWarmup.isPaused && timerWarmup.start();
                timerWork.isPaused && timerWork.start();
            }
        }
    }

    // Handle pasue click
    function handlePauseClick(event) {
        event.preventDefault();
        if (isStart) {
            timerPrepare.pause();
            timerWarmup.pause();
            timerWork.pause();
        }
    }

    // Handle reset click
    function handleResetClick(event) {
        event.preventDefault();
        location.reload();
    }

    btns.start.addEventListener('click', handleStartClick);
    btns.pause.addEventListener('click', handlePauseClick);
    btns.reset.addEventListener('click', handleResetClick);
};

export default logic();
