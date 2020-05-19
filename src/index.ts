import { createSendgrid } from './lib/adapters/SendgridAdapter';
import { Adapter, AdapterSend, Message, SendMessage } from './lib/enmail';

export {
    Adapter,
    AdapterSend,
    Message,
    SendMessage,
} from './lib/enmail';

const send: SendMessage = (message, sendFn, sendOptions) => {
    if (typeof sendFn === 'function') {
        return sendFn(message);
    }
    return sendFn.sender()(message, sendOptions);
};
const sender = <AdapterOptions, SendOptions>(adapter: Adapter<AdapterOptions, SendOptions>) => adapter.sender;

export default {
    send,
    sender,
    createAdapter: {
        sendgrid: createSendgrid,
    },
};
