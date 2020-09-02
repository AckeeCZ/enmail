export interface Message {
    from?: string;
    to?: string | string[];
    content?: string;
    subject?: string;
}

export type SendMessage<AdapterOptions = any, SendOptions = any, MailService = any> =
    (message: Message, adapter: AdapterSend | Adapter<AdapterOptions, SendOptions, MailService>, sendOptions?: SendOptions) => Promise<unknown>;
export type AdapterSend<SendOptions = any> = (message: Message, options?: SendOptions) => Promise<unknown>;

export interface Adapter<AdapterOptions = any, SendOptions = any, MailService = any> {
    options: AdapterOptions;
    mailService: MailService;
    sender: (sendOptions?: SendOptions) => AdapterSend<SendOptions>;
}
