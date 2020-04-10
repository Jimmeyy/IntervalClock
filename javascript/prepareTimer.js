import selectors from './selectors';
import { headingTexts } from './resources';
import { Timer, pad } from 'interval-timer';

const { clock } = selectors();
const duration = 5;

const options = {
    startTime: duration * 1000,
    countdown: true,
    updateFrequency: 1000,
    animationFrame: true,
};

const timer = new Timer(options);

const prepareTimer = function (nextTimer) {
    timer.on('start', () => {
        clock.heading.innerHTML = headingTexts.prepare;
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

export default prepareTimer;
