import enmail from '../../index';

jest.mock('firebase-admin', () => ({
    messaging: (_options?: any) => ({
        sendMulticast: jest.fn(data => data),
    }),
    initializeApp: (_options: any) => {},
}));

describe('Firebase cloud messaging adapter', () => {
    const getFcmAdapter = () => enmail.createAdapter.firebaseCloudMessaging(options);
    const options = {
        projectId: 'projectId',
        serviceAccountId: 'serviceAccountId',
    };
    const adapter = getFcmAdapter();
    const sendOptions = { data: { loginUrl: 'https://ackee.cz' } };
    const body = {
        to: Array(200).fill('registrationToken'),
        content: 'Hello world',
        subject: 'Hello',
    };
    it('Fcm adapter can be created', () => {
        expect(typeof adapter.sender).toEqual('function');
        expect(adapter.options).toStrictEqual(options);
        expect(typeof adapter.mailService.sendMulticast).toEqual('function');
        expect(adapter).toMatchSnapshot();
    });
    it('Sender will be successfully returned', () => {
        const sender = enmail.sender(adapter);
        expect(typeof sender).toEqual('function');
        expect(sender).toEqual(adapter.sender);
    });
    it('The notification can be sent via adapter', async () => {
        const fcmMessage = await adapter.sender()(body, sendOptions) as any;
        expect(Object.keys(fcmMessage).sort()).toEqual(['data', 'tokens', 'notification'].sort());
    });
    it('The notification can be sent via adapter with send options', async () => {
        const fcmMessage = await adapter.sender(sendOptions)(body) as any;
        expect(Object.keys(fcmMessage).sort()).toEqual(['data', 'tokens', 'notification'].sort());
    });
    it('The notification can be sent via adapter without send options', async () => {
        const fcmMessage = await adapter.sender()(body) as any;
        expect(Object.keys(fcmMessage).sort()).toEqual(['tokens', 'notification'].sort());
    });
    it('The notification can be sent via enmail.send', async () => {
        const fcmMessage = await enmail.send(body, adapter) as any;
        expect(Object.keys(fcmMessage).sort()).toEqual(['tokens', 'notification'].sort());
    });
    it('The notification can be sent via enmail.send with sendOptions', async () => {
        const fcmMessage = await enmail.send(body, adapter, sendOptions) as any;
        expect(Object.keys(fcmMessage).sort()).toEqual(['data', 'tokens', 'notification'].sort());
    });
    it('The notification can be sent via sender', async () => {
        const fcmMessage = await enmail.send({ ...body, to: 'test' }, adapter.sender()) as any;
        expect(Object.keys(fcmMessage).sort()).toEqual(['tokens', 'notification'].sort());
    });
    it('The notification can be sent via mailService', async () => {
        const message = {
            notification: {
                title: 'Hello',
                body: 'Hello from enmail!',
            },
            tokens: ['test', 'test2'],
            data: {
                visitUrl: 'https://ackee.cz',
            },
        };
        const fcmMessage = await adapter.mailService.sendMulticast(message) as any;
        expect(fcmMessage).toEqual(message);
    });
});
