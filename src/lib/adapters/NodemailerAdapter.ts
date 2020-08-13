import * as nodemailer from 'nodemailer';
import { Options } from 'nodemailer/lib/smtp-transport';
import { Adapter, AdapterSend } from '../enmail';

export type NodemailerOptions = Options;

export const createNodemailer = (adapterOptions: NodemailerOptions): Adapter<NodemailerOptions, Partial<nodemailer.SendMailOptions>> => {
    const sender = nodemailer.createTransport(adapterOptions);
    return {
        options: adapterOptions,
        mailService: sender,
        sender: (sendOptions) => {
            const send: AdapterSend<Partial<nodemailer.SendMailOptions>> = (message, options) => {
                const { content, ...rest } = message;
                const msg = {
                    ...rest,
                    html: content,
                };
                return sender.sendMail({ ...(sendOptions || {}), ...(options || {}), ...msg });
            };
            return send;
        },
    };
};
