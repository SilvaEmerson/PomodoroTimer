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


const constructTimer = (timerBehavior) => (...args) => new Promise(
    timerBehavior(args[0])
);


export const timer = constructTimer(timerBehavior({
        factors: factors,
        sprint: sprint,
}));


export const actionTime = timer({
    time: 10,
    factor: 'seconds',
    message: 'º Sprint Terminated',
});


export const halfTime = timer({
    time: 10,
    factor: 'seconds',
    message: 'º Half Time terminated',
});


export const biggerHalfTime = timer({
    time: 10,
    factor: 'minutes',
    message: 'Bigger Half Time terminated',
});


export const initMessage = createNotification('Pomodoro Started');

const createSequence = (actionTime, halfTime) => async () => {
    let result = await actionTime;
    console.log(result);
    result();
    let halfRes = await halfTime;
    halfRes();
    ++sprint.n;
    return 'Sucess';
};

export const actionTimeWithNormalHalf = createSequence(actionTime, halfTime);

export const actionTimeWithBigHalf = createSequence(actionTime, biggerHalfTime);
