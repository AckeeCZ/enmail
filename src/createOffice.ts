
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
    settings: OfficeOptions;
} & (
    | {
        service: ServiceType.fcm;
        settings: FcmOfficeOptions;
    }
    | {
        service: ServiceType.gmail;
        settings: GmailOfficeOptions;
    }
    | {
        service: ServiceType.onesignal;
        settings: OnesignalOfficeOptions;
    }
    | {
        service: ServiceType.sendgrid;
        settings: SendgridOfficeOptions;
    });

export interface WrappedOffice {
    office: Office;
    compileLodashTemplate: (templateString: string, context: any) => (...args: any[]) => string;
}

export const instances: Map<string, WrappedOffice> = new Map();

export const createOffice = (options: ServiceOptions, ident: string = 'default') => {
    const office: Office = (() => {
        switch (options.service) {
            case ServiceType.gmail:
                return new GmailOffice(options.settings);
            case ServiceType.fcm:
                return new FcmOffice(options.settings);
            case ServiceType.sendgrid:
                return new SendgridOffice(options.settings);
            case ServiceType.onesignal:
                return new OnesignalOffice(options.settings);
            default:
                // @ts-ignore
                throw new Error(`Unsupported mail service ${options.service}`);
        }
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
