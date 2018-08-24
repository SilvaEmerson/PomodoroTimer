import {preState, getElement} from './index/index';
import {
    sprint,
    initMessage,
    behavior,
    constructTimer,
    createSequence,
} from './timer/timer';


const actionTimeWithNormalHalf = (time, timeInterval) => {
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

const actionTimeWithBigHalf = actionTimeWithNormalHalf;

const workTime = getElement(document, '#workTime');
const restTime = getElement(document, '#restTime');
const confirmConfigBtn = getElement(document, '#confirmConfig');
const biggestRestTime = getElement(document, '#biggestRestTime');
const startPomodoroBtn = getElement(document, '#startPomodoro');


const addListener = ({element, event, action}) => {
    element[event] = action;
};

addListener({
    element: confirmConfigBtn,
    action: () => {
        const state = preState(
            sprint,
            initMessage,
            actionTimeWithNormalHalf(
                workTime.value, restTime.value
            ),
            actionTimeWithBigHalf(
                workTime.value, biggestRestTime.value
            )
        );

        const onTap = state(document);
        startPomodoroBtn.style.visibility = 'visible';
        addListener({
            element: startPomodoroBtn,
            event: 'onclick',
            action: onTap,
        });
    },
    event: 'onclick',
});
