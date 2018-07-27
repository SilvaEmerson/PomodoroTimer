import notify from 'node-notifier';

const creatNotification = (msg) => notify.notify({
    title: 'Notification',
    message: msg,
    icon: __dirname + '/favicon.png',
    sound: true,
});

export default creatNotification;
