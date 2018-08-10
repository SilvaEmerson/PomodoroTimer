import {
    constructTimer,
    sprint,
    createSequence,
    timerBehavior,
} from '../src/timer/timer';

const createNotification = jest.fn((msg) => () => msg);

const behavior = timerBehavior({
    sprint: sprint,
    createNotification: createNotification,
});

const actionTime = constructTimer(behavior({
    time: 0,
    factor: 'minutes',
    message: 'º Sprint Terminated',
}));

const halfTime = constructTimer(behavior({
    time: 0,
    factor: 'minutes',
    message: 'º Half Time terminated',
}));

beforeEach(() => {
    sprint.n = 0;
    createNotification.mock.calls.length = 1;
});

describe('Test timer module', () => {
    it('actionTimeWithNormalHalf should not return null response',
        async (done) => {
        let result = await createSequence(
            sprint,
            actionTime,
            halfTime
        )();
        expect(result).not.toBeNull();
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
        let res = await actionTime();
        expect(res()).not.toBeNull();
        done();
    });

    it('Create notification should was called', async (done) => {
        expect(createNotification.mock.calls.length).toBe(1);
        done();
    });

    it('Timer should return message', async (done) => {
        let res = await actionTime();
        expect(res()).toBe(`${sprint.n} º Sprint Terminated`);
        done();
    });

    it('Should reject message', async (done) => {
        try {
            const actionTimeError = constructTimer(behavior({
                time: 0,
                factor: 'minutes',
                message: 12,
            }));
            await actionTimeError();
        } catch (e) {
            expect(e).toBe('Message must be string');
        }
        done();
    });
});
