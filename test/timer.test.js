import {sprint} from '../src/timer';
const setTimeoutMock = (fn) => {
    fn();
};


const createNotificationMock = (msg) => msg;

const constructTimerMock = (sprint, setTimeout, createNotification) =>
    (time, message) => (callback) => {
    let behavior = (resolve, reject) => setTimeout(() => {
        try {
            sprint.n = callback(sprint.n);
            resolve(createNotification(`${sprint.n} ${message}`));
        } catch (error) {
            reject(error.message);
        }
    }, 60000 * time);

    return new Promise(behavior);
};

const timerMock = constructTimerMock(
    sprint,
    setTimeoutMock,
    createNotificationMock
);


describe('Test timer module', () => {
    it('change sprint number', async () => {
        let sprintBefore = sprint.n;
        let res = await timerMock(25, 'Pomodoro Start!')((n) => ++n);
        expect(res).not.toBe(sprint.n);
    });

    it('test notification creation', async () => {
        let result = await timerMock(25, 'º Terminated')((n) => ++n);
        expect(result).toBe(`${sprint.n} º Terminated`);
    });
});
