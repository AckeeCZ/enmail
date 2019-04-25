
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

export type ServiceOptions = {
    service: ServiceType;
    data: OfficeOptions;
} & (
    | {
        service: ServiceType.fcm;
        data: FcmOfficeOptions;
    }
    | {
        service: ServiceType.gmail;
        data: GmailOfficeOptions;
    }
    | {
        service: ServiceType.onesignal;
        data: OnesignalOfficeOptions;
    }
    | {
        service: ServiceType.sendgrid;
        data: SendgridOfficeOptions;
    });

export interface WrappedOffice {
    office: Office;
    compileLodashTemplate: (templateString: string, context: any) => (...args: any[]) => string;
}

export const instances: Map<string, WrappedOffice> = new Map();

export const createOffice = (options: ServiceOptions, ident: string = 'default') => {
    const office: Office = (() => {
        /* eslint-disable global-require */
        switch (options.service) {
            case ServiceType.gmail:
                return new GmailOffice(options.data);
            case ServiceType.fcm:
                return new FcmOffice(options.data);
            case ServiceType.sendgrid:
                return new SendgridOffice(options.data);
            case ServiceType.onesignal:
                return new OnesignalOffice(options.data);
            default:
                // @ts-ignore
                throw new Error(`Unsupported mail service ${options.service}`);
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
