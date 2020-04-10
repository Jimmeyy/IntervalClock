import selectors from './selectors';
import { convertToTime, formatTimeString, getSound, fillInputs } from './helpers';
import { headingTexts } from './resources';

const logic = function () {
    // Get inputs, buttons and clock html elements
    const { inputs, btns, clock } = selectors();
    fillInputs(inputs); // temp

    const prepareTime = 5;
    let remainingTime = 0;
    let roundsCounter = 0;

    // Prepare interval
    function startInterval(time, callback = null) {
        function intervalEnd() {
            window.clearInterval(interval);
        }

        const interval = setInterval(() => {
            const { hours, minutes, seconds } = convertToTime(time);
            const dateTimeDisplay = formatTimeString({
                hours,
                minutes,
                seconds,
            });
            if (callback) {
                callback(dateTimeDisplay);
            }
            time--;
        }, 1000);

        setTimeout(intervalEnd, time * 1000);

        return new Promise((intervalEnd) => setTimeout(intervalEnd, time * 1000));
    }

    function prepare(displayTime) {
        clock.heading.innerHTML = headingTexts.prepare;
        clock.timer.innerHTML = displayTime;
    }

    function remaining(displayTime) {
        clock.timeRemaining.innerHTML = displayTime;
    }

    function warmup(displayTime) {
        clock.heading.innerHTML = headingTexts.warmup;
        clock.timer.innerHTML = displayTime;
        // temp
        getSound();
    }

    function work(displayTime) {
        clock.heading.innerHTML = headingTexts.work;
        clock.timer.innerHTML = displayTime;
    }

    function rest(displayTime) {
        clock.heading.innerHTML = headingTexts.rest;
        clock.timer.innerHTML = displayTime;
    }

    function roundsIncrement() {
        setTimeout(() => {
            roundsCounter++;
            clock.roundsDone.innerHTML = roundsCounter;
        }, 1000);
    }

    function endWorkout() {
        setTimeout(() => {
            clock.heading.innerHTML = headingTexts.end;
            clock.timer.innerHTML = '00:00';
            clock.timeRemaining.innerHTML = '00:00';
        }, 1000);
    }

    // Handle start button click
    async function handleStartClick(event) {
        event.preventDefault();
        // Input values
        const roundsNumber = parseInt(inputs.rounds.value);
        const workTime = parseInt(inputs.workTime.value);
        const restTime = parseInt(inputs.restTime.value);
        const warmupTime = parseInt(inputs.warmup.value);
        // Clock values
        remainingTime = (workTime + restTime) * roundsNumber + warmupTime + prepareTime;
        // Set rounds amount
        clock.roundsAll.innerHTML = roundsNumber;

        startInterval(remainingTime, remaining);
        await startInterval(prepareTime, prepare);
        await startInterval(warmupTime, warmup);
        for (let i = 0; i < roundsNumber; i++) {
            roundsIncrement(roundsCounter);
            await startInterval(workTime, work);
            await startInterval(restTime, rest);
        }
        endWorkout();
    }

    btns.start.addEventListener('click', handleStartClick);
};

export default logic();
