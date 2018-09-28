import {
    getElement,
    changeStyle,
    getTimeRefactored,
    setBtnState,
    preState,
} from '../src/index/index';

const element = {
    disabled: false,
    className: 'active',
};

const event = {
    target: {
        disabled: false,
    },
};

const document = {
    querySelector: (element) => {
        return {
            innerText: 'Sucess',

        };
    },
};

const sprint = {n: 1};

const initMessage = jest.fn(() => 'Sucess');

const actionTimeWithNormalHalf = jest.fn(() => {
    sprint.n++;
    return Promise.resolve('Sucess');
});

const actionTimeWithBigHalf = jest.fn(() => {
    sprint.n++;
    return Promise.resolve('Sucess');
});

const onTap = preState(
    sprint, initMessage, actionTimeWithNormalHalf, actionTimeWithBigHalf
)(document);

beforeEach(() => {
    element.disabled = false;
    element.className = 'active';
    actionTimeWithNormalHalf.mock.calls.length = 0;
    actionTimeWithBigHalf.mock.calls.length = 0;
});

describe('Test index.js functions', () => {
    it('Should return True', () => {
        expect(setBtnState(element)).toBe(true);
    });

    it('Should return False', () => {
        element.disabled = true;
        expect(setBtnState(element)).toBe(false);
    });

    it('Should toggle to blocked class', () => {
        expect(changeStyle(element)).toBe('blocked');
    });

    it('Should toggle to active class', () => {
        element.className = 'blocked';
        expect(changeStyle(element)).toBe('active');
    });

    it('Should return 02', () => {
        expect(getTimeRefactored(2)).toBe('02');
    });

    it('Should return 22', () => {
        expect(getTimeRefactored(22)).toBe('22');
    });

    it('Should return 00', () => {
        expect(getTimeRefactored(0)).toBe('00');
    });

    it('Should call two promisses', () => {
        onTap(event);
        expect(actionTimeWithNormalHalf.mock.calls.length).not.toBe(0);
    });

    it('It should return big half after a sprint block', () => {
        onTap(event);
        onTap(event);
        onTap(event);
        onTap(event);
        expect(actionTimeWithBigHalf.mock.calls.length).toBe(1);
    });

    it('It should return element', () => {
        expect(getElement(document, 'btn')).toMatchObject({
            innerText: 'Sucess',
        });
    });
});
