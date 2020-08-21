import * as nodemailer from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { Options } from 'nodemailer/lib/smtp-transport';
import { Adapter, AdapterSend } from '../enmail';

export type NodemailerMessage = nodemailer.SendMailOptions;
export type NodemailerOptions = Options;

export const createNodemailer = (adapterOptions: NodemailerOptions): Adapter<NodemailerOptions, Partial<NodemailerMessage>, Mail> => {
    const sender = nodemailer.createTransport(adapterOptions);
    return {
        options: adapterOptions,
        mailService: sender,
        sender: (sendOptions) => {
            const send: AdapterSend<Partial<NodemailerMessage>> = (message, options) => {
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
