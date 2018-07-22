import createNotification from './notifications';

const sprint = {n: 1};

const constructTimer = (sprint) => (time, message) => (callback) => {
    setTimeout(() => {
        createNotification(`${sprint.n} ${message}`);
        try {
            callback = callback(() => spr++);
            callback.bind(spr=sprint)();
        } catch (error) {
            console.log(error.message);
        }
    }, 1000 * time);
};

const timer = constructTimer(sprint);
const actionTime = timer(25, 'º Sprint Terminated');
const halfTime = timer(5, 'Half Time terminated');
const biggerHalfTime = timer(10, 'Half Time terminated');

const onTap = () => {
    createNotification('Pomodoro Started');

    (sprint.n !== 5)
    ? actionTime(halfTime)
    : biggerHalfTime(() => spr = 1);
};
