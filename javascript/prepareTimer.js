import selectors from './selectors';
import { convertToTime, formatTimeString, getSound } from './helpers';
import { headingTexts } from './resources';
import { Timer } from 'interval-timer';

const { clock } = selectors();

const prepareTimer = function () {
    const htmlElement = clock.timer;
    const duration = 5;
    let time = duration;

    const options = {
        updateFrequency: 1000,
        endTime: 1000 * duration,
    };

    const timer = new Timer(options);

    timer.on('update', () => {
        const { hours, minutes, seconds } = convertToTime(time);
        const dateTimeDisplay = formatTimeString({ hours, minutes, seconds });
        htmlElement.innerHTML = dateTimeDisplay;
        time--;
    });

    timer.on('end', () => {
        console.log('bar');
    });

    return timer;
};

export default prepareTimer;
