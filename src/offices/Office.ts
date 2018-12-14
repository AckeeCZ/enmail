
import { SentMessageInfo } from 'nodemailer';
import MailerMail = require('nodemailer/lib/mailer');
import { Mail } from '../Mail';
import { FcmMailer, FcmOfficeOptions } from './FcmOffice';
import { GmailOfficeOptions } from './GmailOffice';
import { OnesignalMailer, OnesignalOfficeOptions } from './OnesignalOffice';
import { SendgridMailer, SendgridOfficeOptions } from './SendgridOffice';

export type Mailer = MailerMail | FcmMailer | SendgridMailer | OnesignalMailer;

export type OfficeResult = SentMessageInfo;
export type OfficeOptions = GmailOfficeOptions | FcmOfficeOptions | SendgridOfficeOptions | OnesignalOfficeOptions;

export abstract class Office {
    protected constructor(public mailer: Mailer) { }
    public abstract send(mail: Mail): Promise<OfficeResult>;
}
