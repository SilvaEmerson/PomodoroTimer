import {changeStyle, getTimeRefactored, setBtnState} from '../src/index';

const element = {
    disabled: false,
    className: 'active',
};

beforeEach(() => {
    element.disabled = false;
    element.className = 'active';
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
});
