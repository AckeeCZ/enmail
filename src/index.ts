import { createNodemailer, NodemailerOptions } from './lib/adapters/NodemailerAdapter';
import { createSendgrid, SendgridOptions } from './lib/adapters/SendgridAdapter';
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
const sender = <AdapterOptions, SendOptions, MailService>(adapter: Adapter<AdapterOptions, SendOptions, MailService>) => adapter.sender;

export { NodemailerOptions, SendgridOptions };
export default {
    send,
    sender,
    createAdapter: {
        sendgrid: createSendgrid,
        nodemailer: createNodemailer,
    },
};
