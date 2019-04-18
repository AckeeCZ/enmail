import sendgrid = require('@sendgrid/mail');
import { defaultsDeep } from 'lodash';
import { RequestResponse } from 'request';
import { Mail, MailType } from '../Mail';
import { Office } from './Office';

export interface SendgridOfficeOptions {
    apiKey: string;
}

export interface SendgridMailer {
    send(data: Mail, isMultiple?: boolean, cb?: (err: Error, result: [RequestResponse, {}]) => void): Promise<[RequestResponse, {}]>;
}

export class SendgridOffice extends Office {
    public mailer!: SendgridMailer;
    constructor(options: SendgridOfficeOptions) {
        sendgrid.setApiKey(options.apiKey);
        super(sendgrid as unknown as SendgridMailer);
    }
    public send(mail: Mail): Promise<[RequestResponse, {}]> {
        const mailRequest = defaultsDeep({
            from: mail.from,
            subject: mail.subject,
            to: mail.to,
            [mail.type === MailType.TEXT ? MailType.TEXT : MailType.HTML]: mail.content,
        }, mail.mailerOptions);
        return Promise.resolve(this.mailer.send(mailRequest));
    }
}
