
export enum MailType {
    HTML = 'html',
    TEXT = 'text',
}

export interface Mail {
    from: Nullable<string>;
    content: Nullable<string>;
    mailerOptions?: any;
    subject: Nullable<string>;
    to: Nullable<string>;
    type: MailType;
}
