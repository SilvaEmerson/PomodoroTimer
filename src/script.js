import {preState, getElement} from './index/index';
import {curry} from './fpUtils';
import {
    sprint,
    initMessage,
    behavior,
    constructTimer,
    createSequence,
} from './timer/timer';

const workTime = getElement(document, '#workTime');
const restTime = getElement(document, '#restTime');
const confirmConfigBtn = getElement(document, '#confirmConfig');
const biggestRestTime = getElement(document, '#biggestRestTime');
const startPomodoroBtn = getElement(document, '#startPomodoro');

const action = (time, timeInterval) => {
    let workConfig = {
        factor: 'minutes',
        time: time,
        message: 'º sprint terminated',
    };

    let intervalConfig = {
        factor: 'minutes',
        time: timeInterval,
        message: 'º interval terminated',
    };

    return createSequence(sprint,
        constructTimer(behavior(workConfig)),
        constructTimer(behavior(intervalConfig))
    );
};

const addListener = (event, action, element) => element[event] = action;

const addListenerCurried = curry(addListener);

const addOnclickEvent = addListenerCurried('onclick');

const startBtnAction = (startPomodoroBtn) => (state) => {
    startPomodoroBtn.style.visibility = 'visible';
    addOnclickEvent(state(document), startPomodoroBtn);
};

const confirmConfigAction = (startBtnAction) => () => {
    const state = preState(sprint, initMessage,
        action(workTime.value, restTime.value),
        action(workTime.value, biggestRestTime.value)
    );

    startBtnAction(state);
};

addOnclickEvent(confirmConfigAction(
    startBtnAction(startPomodoroBtn)
    ), confirmConfigBtn);
