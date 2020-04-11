import selectors from './selectors';
import { headingTexts } from './resources';
import { Timer } from 'interval-timer';
import { timeToDisplay, getSound } from './helpers';

const { inputs, clock } = selectors();

const restTimer = function () {
    const duration = inputs.restTime.value;
    const options = {
        startTime: duration * 1000,
        countdown: true,
        updateFrequency: 1000,
        animationFrame: true,
    };
    const timer = new Timer(options);

    timer.nextTimer = null;

    timer.setNextTimer = function (nextTimer) {
        timer.nextTimer = nextTimer;
    };

    timer.on('start', () => {
        clock.heading.innerHTML = headingTexts.rest;
        getSound();
    });

    timer.on('update', () => {
        clock.timer.innerHTML = timeToDisplay(timer.getTime);
    });

    timer.on('end', () => {
        timer.nextTimer && timer.nextTimer.start();
    });

    return timer;
};

export default restTimer;
