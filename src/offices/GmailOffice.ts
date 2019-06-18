import { defaultsDeep } from 'lodash';
import * as nodemailer from 'nodemailer';
import MailerMail = require('nodemailer/lib/mailer');
import { Credentials } from 'nodemailer/lib/smtp-connection';
import { Options } from 'nodemailer/lib/xoauth2';
import { ServiceType } from '../createOffice';
import { Mail, MailType } from '../Mail';
import { Office } from './Office';

export type GmailAuthOptions = Credentials | Options;

export enum GmailAuthType {
    login = 'login',
    oauth2= 'oauth2',
}

export type GmailOfficeOptions = {
    authType: GmailAuthType;
    settings: GmailAuthOptions;
    mailer?: any;
} & (
    | {
    authType: GmailAuthType.login;
    settings: Credentials;
}
    | {
    authType: GmailAuthType.oauth2;
    settings: Options;
});

export class GmailOffice extends Office {
    public mailer!: MailerMail;
    constructor(options: GmailOfficeOptions) {
        const definedMailer = options.mailer || nodemailer;
        const mailer = definedMailer.createTransport({
            auth: {
                ...options.settings,
                type: options.authType,
            },
            service: ServiceType.gmail,
        });
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
