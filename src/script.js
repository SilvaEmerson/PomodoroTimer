import {preState} from './index/index';
import {
    sprint,
    actionTimeWithBigHalf,
    actionTimeWithNormalHalf,
    initMessage
} from './timer/timer';


const state = preState(
    sprint, initMessage, actionTimeWithNormalHalf, actionTimeWithBigHalf
);

const onTap = state(document);
