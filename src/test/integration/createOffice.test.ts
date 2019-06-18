import { expect } from 'chai';
import { createOffice, instances, ServiceType } from '../../createOffice';
import { MailType } from '../../Mail';
import * as FcmOffice from '../../offices/FcmOffice';
import * as GmailOffice from '../../offices/GmailOffice';
import * as OnesignalOffice from '../../offices/OnesignalOffice';
import * as SendgridOffice from '../../offices/SendgridOffice';

// tslint:disable-next-line
const nodemailerMock = require('nodemailer-mock');

describe('Test createOffice', () => {
    it('Test GmailOffice', () => {
        const data: GmailOffice.GmailOfficeOptions = {
            authType: GmailOffice.GmailAuthType.login,
            mailer: nodemailerMock,
            settings: {
                pass: 'test',
                user: 'test',
            },
        };
        return Promise.resolve()
            .then(() => createOffice({
                service: ServiceType.gmail,
                settings: data,
            }, 'gmail'))
            .then(() => {
                expect(instances.get('gmail'));
                return instances.get('gmail')!;
            })
            .then(instance => instance.office.send({
                from: 'test@example.com',
                content: '<h1>Hello from enmail!</h1>',
                subject: 'Test email',
                to: 'enmail@example.com',
                type: MailType.HTML,
            }))
            .then(response => expect(response));
    });
    it('Test GmailOffice', () => {
        const data: GmailOffice.GmailOfficeOptions = {
            authType: GmailOffice.GmailAuthType.login,
            mailer: nodemailerMock,
            settings: {
                pass: 'test',
                user: 'test',
            },
        };
        return Promise.resolve()
            .then(() => createOffice({
                service: ServiceType.gmail,
                settings: data,
            }, 'gmail'))
            .then(() => {
                expect(instances.get('gmail'));
                return instances.get('gmail')!;
            })
            .then(instance => instance.office.send({
                from: 'test@example.com',
                content: '<h1>Hello from enmail!</h1>',
                subject: 'Test email',
                to: 'enmail@example.com',
                type: MailType.HTML,
            }))
            .then(response => expect(response));
    });
    it('Test FcmOffice', () => {
        const data: FcmOffice.FcmOfficeOptions = {
            authorizationKey: '123456789',
        };
        return Promise.resolve()
            .then(() => createOffice({
                service: ServiceType.fcm,
                settings: data,
            }, 'fcm'))
            .then(() => {
                expect(instances.get('fcm'));
                return instances.get('fcm')!;
            })
            .then(instance => instance.office.send({
                from: '123abc',
                content: 'Hello from enmail!',
                mailerOptions: {
                    data: {
                        notificationId: 1,
                    },
                    notification: null,
                },
                subject: 'Test notification',
                to: 'abc123',
                type: MailType.TEXT,
            }))
            .then(response => expect(response));
    });
    it('Test OnesignalOffice', () => {
        const data: OnesignalOffice.OnesignalOfficeOptions = {
            apiKey: 'key',
            appId: '123',
        };
        return Promise.resolve()
            .then(() => createOffice({
                service: ServiceType.onesignal,
                settings: data,
            }, 'onesignal'))
            .then(() => {
                expect(instances.get('onesignal'));
                return instances.get('onesignal')!;
            })
            .then(instance => instance.office.send({
                from: '123abc',
                content: 'Hello from enmail!',
                mailerOptions: {
                    data: {
                        notificationId: 1,
                    },
                    notification: null,
                },
                subject: 'Test notification',
                to: 'abc123',
                type: MailType.TEXT,
            }))
            .then(response => expect(response));
    });
    it('Test SendgridOffice', () => {
        const data: SendgridOffice.SendgridOfficeOptions = {
            apiKey: 'key',
        };
        return Promise.resolve()
            .then(() => createOffice({
                service: ServiceType.sendgrid,
                settings: data,
            }, 'sendgrid'))
            .then(() => {
                expect(instances.get('sendgrid'));
                return instances.get('sendgrid')!;
            })
            .then(instance => instance.office.send({
                from: 'test@example.com',
                content: '<h1>Hello from enmail!</h1>',
                subject: 'Test email',
                to: 'enmail@example.com',
                type: MailType.HTML,
            }))
            .then(response => expect(response));
    });
});
