import * as admin from 'firebase-admin';
import { chunk } from 'lodash';
import { Adapter, AdapterSend } from '../enmail';

// up to 100 device tokens see https://firebase.google.com/docs/cloud-messaging/send-message#send-messages-to-multiple-devices
const CHUNK_SIZE = 100;

export type FcmOptions = (admin.AppOptions | undefined) & { name?: string };
export type FcmMessage = admin.messaging.MulticastMessage;

export const createFcm = (adapterOptions: FcmOptions): Adapter<FcmOptions, Partial<FcmMessage>> => {
    admin.initializeApp(adapterOptions);
    const sender = admin.messaging();
    return {
        options: adapterOptions,
        mailService: sender,
        sender: (sendOptions) => {
            const send: AdapterSend<Partial<admin.messaging.Message>> = (message, options) => {
                const getMessage = (tokens: string[]): FcmMessage => ({
                    ...(sendOptions || {}),
                    ...(options || {}),
                    tokens,
                    notification: {
                        title: message.subject,
                        body: message.content,
                    },
                });
                return []
                    .concat(message.to as any)
                    .filter(x => x)
                    // @ts-ignore
                    .chunkify(CHUNK_SIZE)
                    .reduce(async (prev: Promise<any>, recipients: string[]) => {
                        await prev;
                        return sender.sendMulticast(getMessage(recipients));
                    }, Promise.resolve());
            };
            return send;
        },
    };
};

Object.defineProperty(Array.prototype, 'chunkify', {
    value(chunkSize: number) {
        return chunk(this, chunkSize);
    },
});
