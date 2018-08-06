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
        (typeof(message) === 'string')
        ? resolve(createNotification(`${sprint.n} ${message}`))
        : reject('Message must be string');
    }, factors[factor] * time);
};

export const constructTimer = (timerBehavior) => () =>
    new Promise(timerBehavior);

const behavior = timerBehavior({
    sprint: sprint,
    createNotification: createNotification,
});


const actionTime = constructTimer(behavior({
    time: 25,
    factor: 'minutes',
    message: 'º Sprint Terminated',
}));

const halfTime = constructTimer(behavior({
    time: 5,
    factor: 'minutes',
    message: 'º Half Time terminated',
}));

const biggerHalfTime = constructTimer(behavior({
    time: 10,
    factor: 'minutes',
    message: 'Bigger Half Time terminated',
}));

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
