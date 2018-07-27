import createNotification from './notifications';
import { resolve } from 'url';

export const sprint = {n: 1};

export const constructTimer = (sprint) => (time, message) => (callback) => {
    const timerBehavior = (resolve, reject) => {
        setTimeout(() => {
            try {
                callback = callback(sprint.n);
                resolve(createNotification(`${sprint.n} ${message}`));
            } catch (error) {
                reject(error.message);
            }
        }, 60000 * time);
    };

    return new Promise(timerBehavior);
};

export const timer = constructTimer(sprint);
export const actionTime = timer(25, 'º Sprint Terminated');
export const halfTime = timer(5, 'Half Time terminated');
export const biggerHalfTime = timer(10, 'Half Time terminated');

const onTap = () => {
    let date = new Date();

    let state = document.getElementById('state');

    state.innerText = (!state.innerText)
    ? `Pomodoro started at: ${date.getHours()}:${date.getMinutes()}`
    : '';

    createNotification('Pomodoro Started');

    (sprint.n !== 5)
    ? actionTime(halfTime)
    : biggerHalfTime(() => spr = 1);
};
