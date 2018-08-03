import {
    constructTimer,
    sprint,
    actionTimeWithNormalHalf,
    timerBehavior,
} from '../src/timer/timer';

const createNotification = jest.fn(() => (str) => str);

const timer = constructTimer(timerBehavior({
    sprint: sprint,
    createNotification: createNotification,
}));

const actionTime = timer({
    time: 2,
    factor: 'seconds',
    message: 'º Sprint Terminated',
});

const halfTime = timer({
    time: 1,
    factor: 'seconds',
    message: 'º Sprint Terminated',
});

beforeEach(() => {
    sprint.n = 0;
});

describe('Test timer module', () => {
    jest.useFakeTimers();
    it('Test actionTimeWithNormalHalf func call', async () => {
        let res = await actionTimeWithNormalHalf(
            sprint,
            actionTime,
            halfTime
        );
        expect(res).not.toBeNull();
    });

    it('Test change sprint number', () => {
        actionTimeWithNormalHalf(
            sprint,
            actionTime,
            halfTime
        );
        expect(sprint.n).toBe(1);
    });

    it('Timer should not be null', async () => {
        let res = await actionTime();

        expect(res).not.toBeNull();
    });

    it('Timer should return message', async () => {
        let res = await actionTime();
        let sprintNumber = sprint.n;
        expect(res).toBe(`${sprintNumber} º Sprint Terminated`);
    });
});
