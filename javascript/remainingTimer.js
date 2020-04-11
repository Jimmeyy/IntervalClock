import selectors from './selectors';
import { Timer } from 'interval-timer';
import { timeToDisplay, getSound } from './helpers';
import { headingTexts } from './resources';

const { inputs, clock } = selectors();

const remainingTimer = function () {
    const rounds = parseInt(inputs.rounds.value);
    const workTime = parseInt(inputs.workTime.value);
    const restTime = parseInt(inputs.restTime.value);
    const warmupTime = parseInt(inputs.warmup.value);
    const prepareTime = parseInt(5);
    const duration = rounds * (workTime + restTime) + warmupTime + prepareTime;
    console.log(duration);
    const options = {
        startTime: duration * 1000,
        countdown: true,
        updateFrequency: 1000,
        animationFrame: true,
    };
    const timer = new Timer(options);

    timer.on('update', () => {
        clock.timeRemaining.innerHTML = timeToDisplay(timer.getTime);
    });

    timer.on('end', () => {
        clock.heading.innerHTML = headingTexts.end;
        getSound();
    });

    return timer;
};

export default remainingTimer;
