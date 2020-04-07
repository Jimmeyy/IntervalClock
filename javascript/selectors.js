const selectors = function() {
    const inputs = {
        rounds: document.querySelector('#rounds'),
        workTime: document.querySelector('#work-time'),
        breakTime: document.querySelector('#break-time'),
        warmup: document.querySelector('#warmup-time')
    }

    const btns = {
        start: document.querySelector('#start-btn'),
        pause: document.querySelector('#pause-btn'),
        reset: document.querySelector('#reset-btn')
    }

    const clock = {
        header: document.querySelector('#clock-header'),
        timer: document.querySelector('#clock-timer'),
        roundsDone: document.querySelector('#clock-rounds-done'),
        roundsAll: document.querySelector('#clock-rounds-all'),
        timeRemaining: document.querySelector('#clock-time-remaining')
    }

    return {inputs, btns, clock}
}

export default selectors;