
import { FcmOffice, FcmOfficeOptions } from './offices/FcmOffice';
import { GmailOffice, GmailOfficeOptions } from './offices/GmailOffice';
import { Office, OfficeOptions } from './offices/Office';
import { OnesignalOffice, OnesignalOfficeOptions } from './offices/OnesignalOffice';
import { SendgridOffice, SendgridOfficeOptions } from './offices/SendgridOffice';
import { compileLodashTemplate } from './templates/compileLodashTemplate';

export enum ServiceType {
    gmail = 'gmail',
    fcm = 'fcm',
    sendgrid = 'sendgrid',
    onesignal = 'onesignal',
}

export interface WrappedOffice {
    office: Office;
    compileLodashTemplate(templateString: string, context: any): any;
}

export const instances: Map<string, WrappedOffice> = new Map();

export const createOffice = (service: ServiceType, instanceOptions: OfficeOptions, ident: string = 'default'): void => {
    const office: Office = (() => {
        /* eslint-disable global-require */
        switch (service) {
            case ServiceType.gmail:
                return new GmailOffice(instanceOptions as GmailOfficeOptions);
            case ServiceType.fcm:
                return new FcmOffice(instanceOptions as FcmOfficeOptions);
            case ServiceType.sendgrid:
                return new SendgridOffice(instanceOptions as SendgridOfficeOptions);
            case ServiceType.onesignal:
                return new OnesignalOffice(instanceOptions as OnesignalOfficeOptions);
            default:
                throw new Error(`Unsupported mail service ${service}`);
        }
        /* eslint-disable global-require */
    })();
    const wrappedOffice = wrapOffice(office);
    instances.set(ident, wrappedOffice);
};

const wrapOffice = (office: Office): WrappedOffice => {
    return {
        office,
        compileLodashTemplate,
    };
};
