jest.mock('../src/timer/timer', () => jest.fn());
import actionTimeWithNormalHalf from '../src/timer/timer';

const sprint = {n: jest.fn()};
actionTimeWithNormalHalf.mockImplementation((sprint) => {
    sprint.n();
});

beforeEach(() => sprint.n.mock.calls.length = 0);

describe('Test timer module', () => {
    it('Test actionTimeWithNormalHalf func call', () => {
        actionTimeWithNormalHalf(sprint);
        expect(actionTimeWithNormalHalf.mock.calls.length).toBe(1);
    });

    it('Test change sprint number', () => {
        actionTimeWithNormalHalf(sprint);
        expect(sprint.n.mock.calls.length).toBe(1);
    });
});
