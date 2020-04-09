import selectors from './selectors';
import {
    convertToTime
} from './helpers';

const logic = function () {
    // Get inputs, buttons and clock html elements
    const {
        inputs,
        btns,
        clock
    } = selectors();

    // Prepare interval
    function startInterval(time) {
        function intervalToDo() {
            const {
                hours,
                minutes,
                seconds
            } = convertToTime(time);
            const dateTimeDisplay = `${hours}:${minutes}:${seconds}`;
            console.log(dateTimeDisplay);
            time--;
        }

        function intervalEnd() {
            window.clearInterval(interval);
        }

        intervalToDo();
        const interval = setInterval(() => {
            intervalToDo();
        }, 1000);

        setTimeout(intervalEnd, time * 1000);

        const promise = new Promise((intervalEnd) => setTimeout(intervalEnd, time * 1000));
        return promise;
    }

    // Handle start button click
    async function handleStartClick(event) {
        // event.preventDefault();
        // const roundsNumber = parseInt(inputs.rounds.value);
        // const workTime = parseInt(inputs.workTime.value);
        // const breakTime = parseInt(inputs.workTime.value);
        // const warmup = parseInt(inputs.warmup.value);

        // --------------------------------------------------------
        // Values from inputs
        const roundsNumber = 5;
        const workTime = 10;
        const breakTime = 5;
        const warmup = 10;
        // Clock values
        const prepareTime = 5;
        let remainingTime = (workTime + breakTime) * roundsNumber + warmup;
        let roundsCounter = 1;
        let setTime = workTime + breakTime;

        await startInterval(prepareTime);
        startInterval(remainingTime);
        await startInterval(warmup);
        for (let i = roundsCounter; i < roundsNumber; i++) {
            await startInterval(workTime);
            await startInterval(breakTime);
        }
        // --------------------------------------------------------
    }

    handleStartClick();
    // btns.start.addEventListener('click', handleStartClick);
};

export default logic();