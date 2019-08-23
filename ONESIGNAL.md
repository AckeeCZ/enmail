# OneSignal

- [https://onesignal.com/](https://onesignal.com/)

## Settings

- Options `OnesignalOfficeOptions`:

```typescript
{
    apiKey: string;
    appId: string;
}
```

## Usage

```typescript
// Channel/Segment send: Recipient `channel=<channelName>`. May be an array.
send({ to: `channel=myChannelName`/*, ...*/ });

// Device notification (player ids). May be an array.
send({ to: `3qwesdfzklxc`/*, ...*/ });
```
Any other options that should be passed to request should be put to `Mail.mailerOptions`. Those are merged with the root of OneSignal request body. E.g., to supply filters and sound, use

```typescript
mail.mailerOptions = {
    filters: [/* ... */],
    android_sound: 'default',
}
```
