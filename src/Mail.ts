
export enum MailType {
    HTML = 'html',
    TEXT = 'text',
}

export interface Mail {
    from?: string;
    content?: string;
    mailerOptions?: any;
    subject?: string;
    to?: string;
    type: MailType;
}
