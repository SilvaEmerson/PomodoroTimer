import createNotification from '../notification/notification';

const factors = {
    'minutes': 60000,
    'seconds': 1000,
};

export const sprint = {n: 1};

const timerBehavior = ({factors, sprint}) => ({time, factor, message}) =>
    (resolve, reject) => {
    setTimeout(() => {
        try {
            resolve(createNotification(`${sprint.n} ${message}`));
        } catch (error) {
            reject(error.message);
        }
    }, factors[factor] * time);
};

const constructTimer = (timerBehavior) => (...args) => () => new Promise(
    timerBehavior(args[0])
);

const timer = constructTimer(timerBehavior({
        factors: factors,
        sprint: sprint,
}));

const actionTime = timer({
    time: 25,
    factor: 'minutes',
    message: 'º Sprint Terminated',
});

const halfTime = timer({
    time: 5,
    factor: 'minutes',
    message: 'º Half Time terminated',
});

const biggerHalfTime = timer({
    time: 10,
    factor: 'minutes',
    message: 'Bigger Half Time terminated',
});

export const initMessage = createNotification('Pomodoro Started');

export const createSequence = (sprint, actionTime, halfType) => async () => {
    let result = await actionTime();
    result();
    let halfResult = await halfType();
    halfResult();
    ++sprint.n;
    return 'Sucess';
};

export const actionTimeWithNormalHalf = createSequence(
    sprint,
    actionTime,
    halfTime
);

export const actionTimeWithBigHalf = createSequence(
    sprint,
    actionTime,
    biggerHalfTime
);
