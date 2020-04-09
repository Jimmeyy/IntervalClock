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

export { convertToTime, formatTimeString };
