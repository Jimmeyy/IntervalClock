import selectors from './selectors';
import { Timer } from 'interval-timer';
import { timeToDisplay, getSound } from './helpers';
import { headingTexts } from './resources';
import { flags } from './globals';

const { inputs, btns, clock } = selectors();

const remainingTimer = function () {
    const rounds = parseInt(inputs.rounds.value);
    const workTime = parseInt(inputs.workTime.value);
    const restTime = parseInt(inputs.restTime.value);
    const warmupTime = parseInt(inputs.warmup.value);
    const prepareTime = parseInt(5);
    const duration = rounds * (workTime + restTime) + warmupTime + prepareTime;
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
        console.log(rounds);
        clock.heading.innerHTML = headingTexts.end;
        flags.isStart = false;
        btns.start.classList.remove('is-disabled');
        getSound();
    });

    return timer;
};

export default remainingTimer;
