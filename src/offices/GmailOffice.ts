import { defaultsDeep } from 'lodash';
import { createTransport, SentMessageInfo } from 'nodemailer';
import MailerMail = require('nodemailer/lib/mailer');
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import {ServiceType} from '../createOffice';
import { Mail, MailType } from '../Mail';
import { Office } from './Office';

export enum GmailAuthType {
    login = 'login',
    oauth2= 'oauth2',
}

export interface GmailOfficeOptions {
    accessToken?: string;
    accessUrl?: string;
    clientId?: string;
    clientSecret?: string;
    expires?: number;
    pass?: string;
    privateKey?: string;
    refreshToken?: string;
    serviceClient?: string;
    type: GmailAuthType;
    user: string;
}

export class GmailOffice extends Office {
    public mailer!: MailerMail;
    constructor(options: GmailOfficeOptions) {
        const mailer = createTransport({
            service: ServiceType.gmail,

            auth: options,
        } as SMTPPool.Options);
        super(mailer);
    }
    public send(mail: Mail): Promise<SentMessageInfo> {
        const mailRequest = defaultsDeep({
            from: mail.from,
            subject: mail.subject,
            to: mail.to,
            [mail.type === MailType.TEXT ? MailType.TEXT : MailType.HTML]: mail.content,
        }, mail.mailerOptions);
        return new Promise((resolve, reject) => {
            this.mailer.sendMail(mailRequest, (err: Nullable<Error>, result: SentMessageInfo) =>
                (err ? reject(err) : resolve(result)));
        });
    }
}
