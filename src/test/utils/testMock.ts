/* tslint:disable:no-console */
import * as nock from 'nock';

// expect all URLs
const mock = nock(/(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/)
    .persist();

console.log(`Listening ...`);

mock.post('/fcm/send')
    .reply(200);

mock.post('/api/v1/notifications')
    .reply(200);

mock.post('/v3/mail/send')
    .reply(200);
