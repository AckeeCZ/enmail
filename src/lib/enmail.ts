export interface Message {
    from?: string;
    to?: string | string[];
    content?: string;
    subject?: string;
}

export type SendMessage<AdapterOptions = any, SendOptions = any> =
    (message: Message, adapter: AdapterSend | Adapter<AdapterOptions, SendOptions>, sendOptions?: SendOptions) => Promise<unknown>;
export type AdapterSend<SendOptions = any> = (message: Message, options?: SendOptions) => Promise<unknown>;

export interface Adapter<AdapterOptions = any, SendOptions = any> {
    options: AdapterOptions;
    mailService: any;
    sender: (sendOptions?: SendOptions) => AdapterSend<SendOptions>;
}
