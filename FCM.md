# Firebase Cloud Messaging (FCM)

- [https://firebase.google.com/docs/cloud-messaging](https://firebase.google.com/docs/cloud-messaging)

## Settings

- Options `FcmOfficeOptions`:

```typescript
{
    authorizationKey: string;
}
```

## Usage

```typescript
// Channel send: Recipient `channel=<channelName>`
send({ to: `channel=myChannelName`/*, ...*/ });

// Device notification (registration ids). May be an array.
send({ to: `3qwesdfzklxc`/*, ...*/ });
```

- `Mail.subject` is used as the `notification.title`, `Mail.body` as the message `notification.content`.
- Any other options that should be passed to request should be put to `Mail.mailerOptions`. Those are merged with the root of fcm request. E.g., to supply data and sound, use

```typescript
mail.mailerOptions = {
    data: {/* ... */},
    notification: { sound: 'default' }
}
```
