import selectors from './selectors';
import { fillInputs } from './helpers';
import validation from './validation';
// timers
import prepareTimer from './prepareTimer';
import warmupTimer from './warmupTimer';
import workTimer from './workTimer';
import restTimer from './restTimer';
import { rounds } from './globals';

const logic = function () {
    const { btns, inputs, clock } = selectors();
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
                // ----------------------------------------------
                rounds.all = inputs.rounds.value;
                clock.roundsAll.innerHTML = rounds.all;
                timerRest = restTimer();
                timerWork = workTimer(timerRest);
                // ----------------------------------------------
                timerWarmup = warmupTimer(timerWork);
                timerPrepare = prepareTimer(timerWarmup);
                timerPrepare.start();
                isStart = true;
            } else {
                timerPrepare.isPaused && timerPrepare.start();
                timerWarmup.isPaused && timerWarmup.start();
                timerWork.isPaused && timerWork.start();
                timerRest.isPaused && timerRest.start();
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
            timerRest.pause();
        }
    }

    // Handle reset click
    function handleResetClick(event) {
        event.preventDefault();
        location.reload();
    }

    // temp helper
    window.addEventListener('click', () => {
        console.log(rounds.counter);
    });

    btns.start.addEventListener('click', handleStartClick);
    btns.pause.addEventListener('click', handlePauseClick);
    btns.reset.addEventListener('click', handleResetClick);
};

export default logic();
