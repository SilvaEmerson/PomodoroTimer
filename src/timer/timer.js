import createNotification from '../notification/notification';

export const sprint = {
    n: 1,
};

export const timerBehavior = ({createNotification, sprint}) =>
    ({time, factor, message}) =>
    (resolve, reject) => {
    const factors = {
        'minutes': 60000,
        'seconds': 1000,
    };

    setTimeout(() => {
        try {
            resolve(createNotification(`${sprint.n} ${message}`));
        } catch (error) {
            reject(error.message);
        }
    }, factors[factor] * time);
};

export const constructTimer = (timerBehavior) => (...args) => () => new Promise(
    timerBehavior(args[0])
);

export const timer = constructTimer(timerBehavior({
        sprint: sprint,
        createNotification: createNotification,
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
