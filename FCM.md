# [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging)
## Settings

- [Firebase Admin SDK App Options](https://firebase.google.com/docs/reference/admin/node/admin.AppOptions) `FcmOptions`

### Usage

```typescript
import enmail from 'enmail';

const body = {
    to: 'registrationToken',
    content: 'Hello enmail!',
    subject: 'Hello',
};
const options = {
    projectId: 'projectId',
    serviceAccountId: 'serviceAccountId',
};
const fcmAdapter = enmail.createAdapter.firebaseCloudMessaging(options);
enmail.send(body, fcmAdapter)
    .then(() => 'Notification was sent!')
    .catch(error => console.log(error.message));
```

* Alternatively you can use adapter's `sender` to send a notification:

```typescript
const fcmAdapter = enmail.createAdapter.firebaseCloudMessaging(options);
fcmAdapter.sender()(body)
    .then()
    .catch();

// Pass send options to it
const sendOptions = { data: { loginUrl: 'https://ackee.cz' } }; // Firebase cloud messaging - admin.messaging.MulticastMessage
fcmAdapter.sender(sendOptions)(body);
// or
fcmAdapter.sender()(body, sendOptions);
```

* You can also use original FCM sender

```typescript
const fcmAdapter = enmail.createAdapter.firebaseCloudMessaging(options);
const sender = fcmAdapter.mailService; // FCM instance
sender.sendMulticast({
    notification: {
        title: 'Hello',
        body: 'Hello from enmail!',
    },
    tokens: ['registrationToken1', 'registrationToken2'],
    data: {
        loginUrl: 'https://ackee.cz',
    },
})
    .then()
    .catch();
```