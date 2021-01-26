import { createFcm, FcmMessage, FcmOptions } from './lib/adapters/FcmAdapter';
import { createNodemailer, NodemailerMessage, NodemailerOptions } from './lib/adapters/NodemailerAdapter';
import { createSendgrid, SendgridMessage, SendgridOptions } from './lib/adapters/SendgridAdapter';
import { Adapter, AdapterSend, Message, SendMessage } from './lib/enmail';

export { compileLodashFileTemplate } from './lib/templates/compileLodashFileTemplate';
export { compileLodashTemplate } from './lib/templates/compileLodashTemplate';
export { withDefaultContext } from './lib/templates/withDefaultContext';

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

export { FcmMessage, FcmOptions, NodemailerMessage, NodemailerOptions, SendgridMessage, SendgridOptions };
export default {
    send,
    sender,
    createAdapter: {
        sendgrid: createSendgrid,
        nodemailer: createNodemailer,
        firebaseCloudMessaging: createFcm,
    },
};
