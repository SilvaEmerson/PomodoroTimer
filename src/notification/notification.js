import notify from 'node-notifier';

const creatNotification = (msg) => () =>notify.notify({
    title: 'Notification',
    message: msg,
    icon: __dirname + '/favicon.png',
    sound: __dirname + '/slow-spring-board.mp3',
});

export default creatNotification;
