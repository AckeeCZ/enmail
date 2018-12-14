import { castArray, defaults, defaultsDeep } from 'lodash';
import * as request from 'request-promise';
import { Mail } from '../Mail';
import { Office } from './Office';

export interface FcmOfficeOptions {
    authorizationKey: string;
}

export interface FcmMailer {
    notifyChannel(channel?: string, data?: object, notification?: object): any;
    notifyDevices(registrationIds?: any[], data?: object, notification?: object): any;
}

interface FcmRequest {
    data?: object;
    notification?: {
        title?: string;
        body?: string;
        sound?: string;
        click_action?: string;
    };
    to?: string;
    registration_ids?: string[];
    priority?: string;
    additional?: any;
    customPayload?: FcmRequest;
    fcmDefaults?: FcmRequest;
}

interface FcmNotifyDevicesResponse {
    multicast_id: number;
    success: number;
    failure: number;
    canonical_ids: number;
    results: Array<{
        message_id: string;
    }>;
}

export class FcmOffice extends Office {
    public mailer!: FcmMailer;
    private readonly authorizationKey: string;
    constructor(options: FcmOfficeOptions) {
        super({
            notifyChannel: (channel?: string, data = {}, notification = undefined) => {
                return this.fcmRequest({
                    data,
                    notification,
                    to: `/topics/${channel}`,
                });
            },
            notifyDevices: (registrationIds = [], data = {}, notification = undefined) => {
                return this.fcmRequest({
                    data,
                    notification,
                    registration_ids: registrationIds,
                })
                    .then((response: FcmNotifyDevicesResponse) => response);
            },
        });
        this.authorizationKey = options.authorizationKey;
    }
    public send(mail: Mail): Promise<any> {
        const singleChannel = String(mail.to).match(/^channel=(.*)$/);
        const notification = (mail.mailerOptions.notification) ? defaultsDeep({
            notification: {
                body: mail.content || '',
                title: mail.subject || '',
            },
        }, mail.mailerOptions).notification : undefined;

        if (singleChannel) {
            return Promise.resolve(this.mailer.notifyChannel(
                singleChannel[1],
                defaults(mail.mailerOptions).data,
                notification
            ));
        }

        return this.mailer.notifyDevices(
            castArray(mail.to || ''),
            defaults(mail.mailerOptions).data,
            notification
        );
    }
    private getRequestParams(params: FcmRequest) {
        const fcmDefaults: FcmRequest = {
            priority: 'high', // Valid values are "normal" and "high."
        };
        return {
            body: defaultsDeep({}, params, fcmDefaults),
            headers: {
                'Authorization': `key=${this.authorizationKey}`,
                'Content-Type': 'application/json',
            },
            json: true,
            method: 'POST',
            uri: 'https://fcm.googleapis.com/fcm/send',
        };
    }
    private fcmRequest(params: FcmRequest) {
        return request(
            this.getRequestParams(params)
        );
    }
}
