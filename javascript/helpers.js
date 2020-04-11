import { pad } from 'interval-timer';

// Convert number to hours, minutes and seconds
const convertToTime = function (time) {
    const hours = Math.floor(time / 3600);
    if (time >= 3600) {
        const hoursAmount = Math.floor(time / 3600);
        time = time - hoursAmount * 3600;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return {
        hours,
        minutes,
        seconds,
    };
};

// Format time string
const formatTimeString = function (time) {
    const hours = ('0' + time.hours).slice(-2);
    const minutes = ('0' + time.minutes).slice(-2);
    const seconds = ('0' + time.seconds).slice(-2);
    if (time.hours) {
        return `${hours}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
};

// Audio play
const getSound = function () {
    const audioUrl = require('../sounds/boxing-bell.mp3');
    const audio = new Audio(audioUrl);
    audio.play();
};

// Convert time to disaplay
const timeToDisplay = function (time) {
    const { hours, minutes, seconds } = time;
    let timeToDisplay;
    if (hours) {
        timeToDisplay = pad('00', hours, true) + ':' + pad('00', minutes, true) + ':' + pad('00', seconds, true);
    } else {
        timeToDisplay = pad('00', minutes, true) + ':' + pad('00', seconds, true);
    }

    return timeToDisplay;
};

// Fill inputs with values (Development function)
const fillInputs = function (inputs) {
    window.addEventListener('keypress', (event) => {
        if (event.key === 'f') {
            inputs.rounds.value = 5;
            inputs.workTime.value = 2;
            inputs.restTime.value = 2;
            inputs.warmup.value = 10;
        }
    });
};

export { convertToTime, formatTimeString, getSound, fillInputs, timeToDisplay };
