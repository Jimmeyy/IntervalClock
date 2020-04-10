import selectors from './selectors';
import { headingTexts } from './resources';
import { Timer, pad } from 'interval-timer';

const { inputs, clock } = selectors();
const duration = inputs.warmup.value;
console.log(duration);

const options = {
    startTime: duration * 1000,
    countdown: true,
    updateFrequency: 1000,
    animationFrame: true,
};

const timer = new Timer(options);

const warmupTimer = function (nextTimer) {
    timer.on('start', () => {
        clock.heading.innerHTML = headingTexts.warmup;
    });

    timer.on('update', () => {
        const { hours, minutes, seconds } = timer.getTime;
        let timeToDisplay;
        if (hours) {
            timeToDisplay = pad('00', hours, true) + ':' + pad('00', minutes, true) + ':' + pad('00', seconds, true);
        } else {
            timeToDisplay = pad('00', minutes, true) + ':' + pad('00', seconds, true);
        }
        clock.timer.innerHTML = timeToDisplay;
    });

    timer.on('end', () => {
        nextTimer && nextTimer.start();
    });

    return timer;
};

export default warmupTimer;
