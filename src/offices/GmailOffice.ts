import { defaultsDeep } from 'lodash';
import * as nodemailer from 'nodemailer';
import MailerMail = require('nodemailer/lib/mailer');
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import {ServiceType} from '../createOffice';
import { Mail, MailType } from '../Mail';
import { Office } from './Office';

type GmailAuthOptions = GmailLoginOptions | GmailOAuth2Options;

export enum GmailAuthType {
    login = 'login',
    oauth2= 'oauth2',
}

export interface GmailLoginOptions {
    user: string;
    pass: string;
}

export interface GmailOAuth2Options {
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}

export type GmailOfficeOptions = {
    authType: GmailAuthType;
    settings: GmailAuthOptions;
    mailer?: any;
} & (
    | {
    authType: GmailAuthType.login;
    settings: GmailLoginOptions;
}
    | {
    authType: GmailAuthType.oauth2;
    settings: GmailOAuth2Options;
});

export class GmailOffice extends Office {
    public mailer!: MailerMail;
    constructor(options: GmailOfficeOptions) {
        const definedMailer = options.mailer || nodemailer;
        const mailer = definedMailer.createTransport({
            service: ServiceType.gmail,
            auth: {
                ...options.settings,
                type: options.authType,
            },
        } as SMTPPool.Options);
        super(mailer);
    }
    public send(mail: Mail): Promise<nodemailer.SentMessageInfo> {
        const mailRequest = defaultsDeep({
            from: mail.from,
            subject: mail.subject,
            to: mail.to,
            [mail.type === MailType.TEXT ? MailType.TEXT : MailType.HTML]: mail.content,
        }, mail.mailerOptions);
        return new Promise((resolve, reject) => {
            this.mailer.sendMail(mailRequest, (err: Error | null, result: nodemailer.SentMessageInfo) =>
                (err ? reject(err) : resolve(result)));
        });
    }
}
