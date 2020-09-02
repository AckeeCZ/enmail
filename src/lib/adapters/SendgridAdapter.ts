import { MailData, MailDataRequired } from '@sendgrid/helpers/classes/mail';
import * as sendgrid from '@sendgrid/mail';
import { Adapter, AdapterSend } from '../enmail';

export interface SendgridOptions {
    apiKey: string;
}

export const createSendgrid = (adapterOptions: SendgridOptions): Adapter<SendgridOptions, Partial<MailData>, sendgrid.MailService> => {
    const sender = sendgrid;
    sender.setApiKey(adapterOptions.apiKey);
    return {
        options: adapterOptions,
        mailService: sendgrid,
        sender: (sendOptions) => {
            const send: AdapterSend<Partial<MailData>> = (message, options) => {
                const { content, ...rest } = message;
                const msg = {
                    ...rest,
                    html: content,
                };
                return sender.send({ ...(sendOptions || {}), ...(options || {}), ...msg } as MailDataRequired);
            };
            return send;
        },
    };
};
