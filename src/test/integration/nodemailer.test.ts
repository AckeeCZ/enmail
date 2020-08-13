import enmail from '../../index';

jest.mock('nodemailer');
const nodemailer = require('nodemailer');
nodemailer.createTransport.mockReturnValue({ sendMail: jest.fn(data => data) });

describe('Nodemailer adapter', () => {
    const getGmailAdapter = () => enmail.createAdapter.nodemailer(options);
    const options = {
        service: 'gmail',
        auth: {
            type: 'login' as const,
            user: 'test2@example.com',
            pass: '********',
        },
    };
    const adapter = getGmailAdapter();
    const sendOptions = { bcc: 'test3@example.com' };
    const body = {
        to: 'test@example.com',
        from: 'test2@example.com',
        content: 'Hello world',
        subject: 'Hello',
    };
    it('Gmail adapter can be created', () => {
        expect(typeof adapter.sender).toEqual('function');
        expect(adapter.options).toStrictEqual(options);
        expect(typeof adapter.mailService.sendMail).toEqual('function');
        expect(adapter).toMatchSnapshot();
    });
    it('Sender will be successfully returned', () => {
        const sender = enmail.sender(adapter);
        expect(typeof sender).toEqual('function');
        expect(sender).toEqual(adapter.sender);
    });
    it('An email is created via adapter', async () => {
        const gmailMessage = await adapter.sender()(body, sendOptions) as any;
        expectNodemailerEmailObj(gmailMessage, ['bcc']);
    });
    it('An email is created via adapter with send options', async () => {
        const gmailMessage = await adapter.sender(sendOptions)(body) as any;
        expectNodemailerEmailObj(gmailMessage, ['bcc']);
    });
    it('An email is created via adapter without send options', async () => {
        const gmailMessage = await adapter.sender()(body) as any;
        expectNodemailerEmailObj(gmailMessage);
    });
    it('An email is created via enmail.send', async () => {
        const gmailMessage = await enmail.send(body, adapter) as any;
        expectNodemailerEmailObj(gmailMessage);
    });
    it('An email is created via enmail.send with sendOptions', async () => {
        const gmailMessage = await enmail.send(body, adapter, sendOptions) as any;
        expectNodemailerEmailObj(gmailMessage, ['bcc']);
    });
    it('An email is created via sender', async () => {
        const gmailMessage = await enmail.send(body, adapter.sender()) as any;
        expectNodemailerEmailObj(gmailMessage);
    });
    it('An email is created via mailService', async () => {
        const { content, ...rest } = body;
        const gmailMessage = await adapter.mailService.sendMail({ ...rest, html: content }) as any;
        expectNodemailerEmailObj(gmailMessage);
    });
});

const expectNodemailerEmailObj = (email: any, additionalEmailProps?: string[]) => {
    const props = ['to', 'html', 'from', 'subject', ...(additionalEmailProps || [])]
        .filter(x => x)
        .sort();
    const messageProps = Object.keys(email).sort();
    expect(messageProps).toEqual(props);
};
