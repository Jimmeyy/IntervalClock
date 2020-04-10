import selectors from './selectors';
import { fillInputs } from './helpers';
import validation from './validation';
import prepareTimer from './prepareTimer';

const logic = function () {
    const { btns, inputs } = selectors();
    fillInputs(inputs);

    async function startLoop() {
        const timerPrepare = prepareTimer();
        const foo = timerPrepare.start();
        console.log(foo);
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
