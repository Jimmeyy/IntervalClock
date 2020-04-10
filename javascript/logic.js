import selectors from './selectors';
import { fillInputs } from './helpers';
import validation from './validation';
// timers
import prepareTimer from './prepareTimer';
import warmupTimer from './warmupTimer';

const logic = function () {
    const { btns, inputs } = selectors();
    fillInputs(inputs);
    let isPause = false;

    const timerWarmup = warmupTimer();
    const timerPrepare = prepareTimer(timerWarmup);

    // Handle pasue click
    function handlePauseClick(event) {
        event.preventDefault();

        timerPrepare.pause();
    }

    // Handle start click
    function handleStartClick(event) {
        event.preventDefault();

        if (!validation()) {
            timerPrepare.start();
        }
    }

    btns.start.addEventListener('click', handleStartClick);
    btns.pause.addEventListener('click', handlePauseClick);
};

export default logic();
