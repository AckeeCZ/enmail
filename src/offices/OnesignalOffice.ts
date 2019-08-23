import { castArray, cond, constant, defaultsDeep, every, isPlainObject, isString } from 'lodash';
import * as request from 'request-promise';
import { Mail } from '../Mail';
import { Office } from './Office';

export interface OnesignalMailer {
    notifyPlayerIds(playerIds: any[], message?: any): any;
    notifyChannels(channels: any[], message?: any): any;
    notifyFilters(filters: any[], message?: any): any;
}

export interface OnesignalOfficeOptions {
    apiKey: string;
    appId: string;
}

export class OnesignalOffice extends Office {
    public mailer!: OnesignalMailer;
    private readonly apiKey: string;
    private readonly appId: string;
    private mail!: Mail;
    constructor(options: OnesignalOfficeOptions) {
        super({
            notifyChannels: (channels = [], message?: any) => this.gatewayRequest(defaultsDeep({
                included_segments: channels,
            }, message)),
            notifyFilters: (filters = [], message?: any) => this.gatewayRequest(defaultsDeep({
                filters,
            }, message)),
            notifyPlayerIds: (playerIds = [], message?: any) => this.gatewayRequest(defaultsDeep({
                include_player_ids: playerIds,
            }, message)),
        });
        this.apiKey = options.apiKey;
        this.appId = options.appId;
    }
    public send(mail: Mail): Promise<any> {
        const officeSendMethod = cond([
            [
                (recipients) => every(recipients, recipient => /^channel=(.*)$/.test(String(recipient))),
                (recipients: any[]) =>
                    (...args: string[]) => this.mailer.notifyChannels(
                        recipients.map((recipient: string[]) => String(recipient).slice('channel='.length)),
                        ...args
                    ),
            ],
            [
                (recipients) => (String(recipients) === 'filters'),
                () =>
                    (...args: string[]) => this.mailer.notifyFilters(
                        this.mail.mailerOptions.filters,
                        ...args
                    ),
            ],
            [
                (recipients) => every(recipients, isString),
                (playerIds) =>
                    (...args: string[]) => this.mailer.notifyPlayerIds(playerIds, ...args),
            ],
            [
                constant(true),
                (to) => {
                    throw new Error(`Could not recognize recipient: ${JSON.stringify(to)}`);
                },
            ],
        ])(castArray(mail.to));
        const message = defaultsDeep({
            contents: this.translated(mail.content),
            headings: this.translated(mail.subject),
        }, mail.mailerOptions);
        this.mail = mail;
        return Promise.resolve(officeSendMethod(message));
    }
    private gatewayRequest = (message: any) => request({
        body: defaultsDeep({}, message, { app_id: String(this.appId) }),
        headers: {
            'Authorization': `Basic ${this.apiKey}`,
            'Content-Type': 'application/json',
        },
        json: true,
        method: 'POST',
        uri: 'https://onesignal.com/api/v1/notifications',
    })
    private translated = (item?: string) => {
        if (isPlainObject(item)) {
            return item;
        }
        return { en: String(item) };
    }
}
