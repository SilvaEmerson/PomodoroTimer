import assert from 'assert';
import { actionTime, sprint, halfTime } from "../src/timer";

const setTimeoutMock = (fn, time) => {
    fn();
};

const createNotificationMock = (msg) => msg;

const timerMock = constructTimerMock(sprint);

const constructTimerMock = (sprint, setTimeout, createNotification) =>
    (time, message) => (callback) => {
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

describe('Test timer module', () => {
    //TODO
    it('test sequency', () => {
    });
});
