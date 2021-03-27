import Echo from 'laravel-echo';
import {constants} from '../store/constants'

window.Pusher = require('pusher-js');
export const echo = new Echo({
    broadcaster: 'pusher',
    key: constants.PUSHER_APP_KEY,
    cluster: constants.PUSHER_CLUSTER,
    forceTLS: true
});