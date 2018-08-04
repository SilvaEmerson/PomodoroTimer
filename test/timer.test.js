import {
    constructTimer,
    sprint,
    createSequence,
    timerBehavior,
} from '../src/timer/timer';

const createNotification = jest.fn(() => (str) => str);

const timer = constructTimer(timerBehavior({
    sprint: sprint,
    createNotification: createNotification,
}));

const actionTime = timer({
    time: 0,
    factor: 'seconds',
    message: 'º Sprint Terminated',
});

const halfTime = timer({
    time: 0,
    factor: 'seconds',
    message: 'º Sprint Terminated',
});

describe('Test timer module', () => {
    it('Test actionTimeWithNormalHalf func call', async (done) => {
        let result = await createSequence(
            sprint,
            actionTime,
            halfTime
        )();
        expect(result).not.toBeNull();
        sprint.n = 0;
        done();
    });

    it('Test change sprint number', async (done) => {
        await createSequence(
            sprint,
            actionTime,
            halfTime
        )();
        expect(sprint.n).toBe(1);
        done();
    });

    it('Should return Sucess message', async (done) => {
        let result = await createSequence(
            sprint,
            actionTime,
            halfTime
        )();
        expect(result).toBe('Sucess');
        done();
    });

    it('Timer should not be null', async (done) => {
        let sprintNumber = sprint.n;
        let res = await actionTime();
        res = res(`${sprintNumber} º Sprint Terminated`);
        expect(res).not.toBeNull();
        done();
    });

    it('Timer should return message', async (done) => {
        let sprintNumber = sprint.n;
        let res = await actionTime();
        res = res(`${sprintNumber} º Sprint Terminated`);
        expect(res).toBe(`${sprintNumber} º Sprint Terminated`);
        done();
    });
});
