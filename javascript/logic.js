import selectors from './selectors';

const logic = function () {
    const { inputs, btns, clock } = selectors();

    // Convert number to hours, minutes and seconds
    function convertToTime(time) {
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

    // Handle start button click
    function handleStartClick(event) {
        // event.preventDefault();

        // const roundsNumber = parseFloat(inputs.rounds.value);
        // const workTime = parseFloat(inputs.workTime.value);
        // const breakTime = parseFloat(inputs.workTime.value);
        // const warmup = parseFloat(inputs.warmup.value);
        // let time = (workTime + breakTime) * roundsNumber + warmup;

        // temp
        const roundsNumber = 5;
        const workTime = 5;
        const breakTime = 2;
        const warmup = 0;
        let time = parseInt(566);
        let dateTime = convertToTime(time);

        setInterval(() => {
            console.log(roundsNumber);
            roundsNumber--;
        }, (workTime + breakTime) * 1000);
    }
    handleStartClick();
    // btns.start.addEventListener('click', handleStartClick);
};

export default logic();
