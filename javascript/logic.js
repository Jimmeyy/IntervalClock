import selectors from './selectors';
import validation from './validation';
// timers
import prepareTimer from './prepareTimer';
import warmupTimer from './warmupTimer';
import workTimer from './workTimer';
import restTimer from './restTimer';
import remainingTimer from './remainingTimer';
import { rounds, flags } from './globals';

const logic = function () {
    const { btns, inputs, clock } = selectors();

    let timerWarmup;
    let timerPrepare;
    let timerWork = [];
    let timerRest = [];
    let timerRemaining;

    // Handle start click
    function handleStartClick(event) {
        event.preventDefault();
        if (!validation()) {
            if (!flags.isStart) {
                rounds.all = inputs.rounds.value;
                rounds.counter = 0;
                clock.roundsAll.innerHTML = rounds.all;
                for (let i = 0; i < rounds.all; i++) {
                    timerRest[i] = restTimer();
                    timerWork[i] = workTimer(timerRest[i]);
                }
                for (let i = 0; i < rounds.all - 1; i++) {
                    timerRest[i].setNextTimer(timerWork[i + 1]);
                }
                timerWarmup = warmupTimer(timerWork[0]);
                timerPrepare = prepareTimer(timerWarmup);
                timerRemaining = remainingTimer();
                timerPrepare.start();
                timerRemaining.start();
                flags.isStart = true;
            } else {
                timerPrepare.isPaused && timerPrepare.start();
                timerWarmup.isPaused && timerWarmup.start();
                timerWork.forEach((timer) => {
                    timer.isPaused && timer.start();
                });
                timerRest.forEach((timer) => {
                    timer.isPaused && timer.start();
                });
                timerRemaining.isPaused && timerRemaining.start();
                document.querySelector('.clock-wrapper').classList.remove('is-paused');
            }
            btns.start.classList.add('is-disabled');
        }
    }

    // Handle pasue click
    function handlePauseClick(event) {
        event.preventDefault();
        if (flags.isStart) {
            timerPrepare.pause();
            timerWarmup.pause();
            timerWork.forEach((timer) => {
                timer.pause();
            });
            timerRest.forEach((timer) => {
                timer.pause();
            });
            timerRemaining.pause();
            document.querySelector('.clock-wrapper').classList.add('is-paused');
            btns.start.classList.remove('is-disabled');
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
