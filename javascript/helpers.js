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
}

export {
    convertToTime
}