import selectors from './selectors';
import validator from 'validator';

const showErrors = function (inputsArr) {
    inputsArr.forEach((element) => {
        if (element.errorFlag) {
            element.errorHtml.classList.add('is-active');
        } else {
            element.errorHtml.classList.remove('is-active');
        }
    });
};

const validation = function () {
    let isError = false;
    const { inputs } = selectors();
    const names = Object.keys(inputs);

    const inputsArr = names.map((name) => {
        return {
            name: name,
            input: inputs[name],
            errorHtml: inputs[name].parentNode.parentNode.querySelector('.input-error'),
            errorFlag: false,
        };
    });

    inputsArr.forEach((element) => {
        element.errorFlag = !validator.isInt(element.input.value) && validator.isEmpty(element.input.value);
    });

    inputsArr.forEach((element) => {
        if (element.errorFlag) isError = true;
    });

    showErrors(inputsArr);

    return isError;
};

export default validation;
