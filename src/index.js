import {
    actionTimeWithNormalHalf, initMessage,
    sprint, actionTimeWithBigHalf,
} from './timer/timer';

const getElement = (element) => document.getElementById(element);

export const setBtnState = (element) => !element.disabled;

export const changeStyle = (element) =>
    (element.className === 'blocked')
    ? 'active'
    : 'blocked';


export const getTimeRefactored = (time) => (time).toString().padStart(2, '0');

const onTap = (event) => {
    let date = new Date();

    let state = getElement('state');

    state.innerText = `Pomodoro started at:
                       ${getTimeRefactored(date.getHours())}:
                       ${getTimeRefactored(date.getMinutes())}`;

    event.target.disabled = setBtnState(event.target);
    event.target.className = changeStyle(event.target);

    initMessage();

    (sprint.n % 4 !== 0)
        ? actionTimeWithNormalHalf().then(
            (msg) => {
                event.target.disabled = setBtnState(event.target);
                event.target.clasName = changeStyle(event.target);
            }
        )
        : actionTimeWithBigHalf().then(
            (msg) => {
                event.target.disabled = setBtnState(event.target);
                event.target.clasName = changeStyle(event.target);
            }
        );
};
