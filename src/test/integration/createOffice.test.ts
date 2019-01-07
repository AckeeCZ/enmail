import {expect} from 'chai';
import {createOffice, instances, ServiceType} from '../../createOffice';
import {MailType} from '../../Mail';
import * as FcmOffice from '../../offices/FcmOffice';
import * as GmailOffice from '../../offices/GmailOffice';
import * as OnesignalOffice from '../../offices/OnesignalOffice';
import * as SendgridOffice from '../../offices/SendgridOffice';

const nodemailerMock = require('nodemailer-mock');

describe('Test createOffice', () => {
    it('Test GmailOffice', () => {
        const gmailOptions: GmailOffice.GmailOfficeOptions = {
            type: GmailOffice.GmailAuthType.login,
            user: 'test',
            pass: 'test',
            mailer: nodemailerMock,
        };
        return Promise.resolve()
            .then(() => createOffice(ServiceType.gmail, gmailOptions, 'gmail'))
            .then(() => {
                expect(instances.get('gmail'));
                return instances.get('gmail')!;
            })
            .then(instance => instance.office.send({
                to: 'enmail@example.com',
                from: 'test@example.com',
                subject: 'Test email',
                type: MailType.HTML,
                content: '<h1>Hello from enmail!</h1>',
            }))
            .then(response => expect(response));
    });
    it('Test FcmOffice', () => {
        const fcmOptions: FcmOffice.FcmOfficeOptions = {
            authorizationKey: '123456789',
        };
        return Promise.resolve()
            .then(() => createOffice(ServiceType.fcm, fcmOptions, 'fcm'))
            .then(() => {
                expect(instances.get('fcm'));
                return instances.get('fcm')!;
            })
            .then(instance => instance.office.send({
                to: 'abc123',
                from: '123abc',
                subject: 'Test notification',
                content: 'Hello from enmail!',
                type: MailType.TEXT,
                mailerOptions: {
                    notification: null,
                    data: {
                        notificationId: 1,
                    },
                },
            }))
            .then(response => expect(response));
    });
    it('Test OnesignalOffice', () => {
        const onesignalOptions: OnesignalOffice.OnesignalOfficeOptions = {
            appId: '123',
            apiKey: 'key',
        };
        return Promise.resolve()
            .then(() => createOffice(ServiceType.onesignal, onesignalOptions, 'onesignal'))
            .then(() => {
                expect(instances.get('onesignal'));
                return instances.get('onesignal')!;
            })
            .then(instance => instance.office.send({
                to: 'abc123',
                from: '123abc',
                subject: 'Test notification',
                content: 'Hello from enmail!',
                type: MailType.TEXT,
                mailerOptions: {
                    notification: null,
                    data: {
                        notificationId: 1,
                    },
                },
            }))
            .then(response => expect(response));
    });
    it('Test SendgridOffice', () => {
        const sendgridOptions: SendgridOffice.SendgridOfficeOptions = {
            apiKey: 'key',
        };
        return Promise.resolve()
            .then(() => createOffice(ServiceType.sendgrid, sendgridOptions, 'sendgrid'))
            .then(() => {
                expect(instances.get('sendgrid'));
                return instances.get('sendgrid')!;
            })
            .then(instance => instance.office.send({
                to: 'enmail@example.com',
                from: 'test@example.com',
                subject: 'Test email',
                type: MailType.HTML,
                content: '<h1>Hello from enmail!</h1>',
            }))
            .then(response => expect(response));
    });
});
