import selectors from './selectors';
import { fillInputs } from './helpers';
import validation from './validation';
// timers
import prepareTimer from './prepareTimer';
import warmupTimer from './warmupTimer';

const logic = function () {
    const { btns, inputs } = selectors();
    fillInputs(inputs);

    async function startLoop() {
        const timerWarmup = warmupTimer();
        const timerPrepare = prepareTimer(timerWarmup);

        timerPrepare.start();
    }

    function handleStartClick(event) {
        event.preventDefault();

        if (!validation()) {
            startLoop();
        }
    }

    btns.start.addEventListener('click', handleStartClick);
};

export default logic();
