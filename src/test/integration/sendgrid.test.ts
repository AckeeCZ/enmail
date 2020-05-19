import enmail from '../../index';
import { mockApis } from '../utils/testMock';

describe('Sendgrid adapter', () => {
    const getSendgridAdapter = () => enmail.createAdapter.sendgrid(options);
    const options = { apiKey: 'SG.apiKey' };
    const adapter = getSendgridAdapter();
    const sendOptions = { mailSettings: { sandboxMode: { enable: true } } };
    const body = {
        to: 'test@example.com',
        from: 'test2@example.com',
        content: 'Hello world',
        subject: 'Hello',
    };
    beforeAll(() => mockApis());
    it('Sendgrid adapter can be created', () => {
        expect(typeof adapter.sender).toEqual('function');
        expect(adapter.options).toStrictEqual(options);
        expect(typeof adapter.mailService.send).toEqual('function');
        expect(adapter).toMatchSnapshot();
    });
    it('Sender will be successfully returned', () => {
        const sender = enmail.sender(adapter);
        expect(typeof sender).toEqual('function');
        expect(sender).toEqual(adapter.sender);
    });
    it('An email can be sent via adapter', async () => {
        const [{ statusCode }] = await adapter.sender()(body, sendOptions) as any;
        expect(statusCode).toEqual(200);
    });
    it('An email can be sent via adapter with send options', async () => {
        const [{ statusCode }] = await adapter.sender(sendOptions)(body) as any;
        expect(statusCode).toEqual(200);
    });
    it('An email can be sent via adapter without send options', async () => {
        const [{ statusCode }] = await adapter.sender()(body) as any;
        expect(statusCode).toEqual(200);
    });
    it('An email can be sent via enmail.send', async () => {
        const [{ statusCode }] = await enmail.send(body, adapter) as any;
        expect(statusCode).toEqual(200);
    });
    it('An email can be sent via enmail.send with sendOptions', async () => {
        const [{ statusCode }] = await enmail.send(body, adapter, { myOptions: 'options' }) as any;
        expect(statusCode).toEqual(200);
    });
    it('An email can be sent via sender', async () => {
        const [{ statusCode }] = await enmail.send(body, adapter.sender()) as any;
        expect(statusCode).toEqual(200);
    });
});
