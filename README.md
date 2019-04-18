# enmail

[![Build Status](https://travis-ci.org/AckeeCZ/enmail.svg?branch=master)](https://travis-ci.org/AckeeCZ/enmail)
[![Npm](https://img.shields.io/npm/v/enmail.svg?style=flat-square)](https://www.npmjs.com/package/enmail)
[![License](https://img.shields.io/github/license/AckeeCZ/enmail.svg?style=flat-square)](https://github.com/AckeeCZ/enmail/blob/master/LICENSE)

Handles message communication with end users through various means of messages - email, sms, chat messages using uniform API.

> Neither snow nor rain nor heat nor gloom of night stays these couriers from the swift completion of their appointed rounds

GitHub repository: [https://github.com/AckeeCZ/enmail](https://github.com/AckeeCZ/enmail)

## Install

```bash
npm i --save enmail
```

## Quickstart

```typescript
import {
    createOffice,
    getOffice,
    GmailAuthType,
    Mail,
    MailType,
    ServiceType 
} from 'enmail';

// Creates an office given the options, see below, and saves
// instance under given key. If none key given, is saved under a 'default' name.
createOffice({
    service: ServiceType.gmail,
    data: {
        type: GmailAuthType.login, // GmailAuthType.oauth2
        user: 'test@gmail.com',
        pass: '******',
    },
});
// Mail object providing universal message container used throughout
// all the offices
const mail: Mail = {
    from: 'me@gmail.com',
    to: 'example@test.org',
    type: MailType.HTML, // MailType.TEXT
    subject: 'Hello, its me',
    content: `<p>I was wondering if after all these years you'd like to meet to go over everything ...</p>`,
    // optional: mailerOptions
};
// Gets office by key. Called without parameters, gets the default instance.
getOffice()
    .send(mail)
    .then(res => /* ... */)
    .catch(e => /* ... */)
// ...
```

## Supported transports and ini options

- `gmail` (`GmailOfficeOptions`)
    ```typescript
    {
        accessToken?: string;
        accessUrl?: string;
        clientId?: string;
        clientSecret?: string;
        expires?: number;
        pass?: string;
        privateKey?: string;
        refreshToken?: string;
        serviceClient?: string;
        type: GmailAuthType; // login or oauth2 - enum
        user: string;
        mailer: any;
    }
    ```

- `sendgrid` (`SendgridOfficeOptions`)
    ```typescript
    {
        apiKey: string;
    }
    ```

- `onesignal` (`OnesignalOfficeOptions`)
    ```typescript
    {
        apiKey: string;
        appId: string;
    }
    ```

- `fcm` (`FcmOfficeOptions`)
    ```typescript
    {
        authorizationKey: string;
    }
    ```

### FCM

```typescript
// Channel send: Recipient `channel=<channelName>`
send({ to: `channel=myChannelName`/*, ...*/ });
// Device notification (registration ids). May be an array.
send({ to: `3qwesdfzklxc`/*, ...*/ });
```
`Mail.subject` is used as the `notification.title`, `Mail.body` as the message `notification.content`.

Any other options that should be passed to request should be put to `Mail.mailerOptions`. Those are merged with the root of fcm request. E.g., to supply data and sound, use
```typescript
mail.mailerOptions = {
    data: {/* ... */},
    notification: { sound: 'default' }
}
```

If you dont want to use the `notification` object, you can set it on `null` then `notification` object will be ignored.

### OneSignal

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

### Sendgrid

Would be same as `gmail`, you only need to change `ServiceType.gmail` and add your `apiKey`

## Concept

Formerly an email sender, generally a message sender. Emails - electronic mails, letters... letters are sent and delivered by a post office, thus office is the key hub for sending those messages.

Office have to be built first. Once built, offce can _send_ a message.

### Templates

```typescript
import {
    // (templateString, context) Given template string
    // (https://lodash.com/docs/4.17.4#template) and variables, function compiles
    // this template and can later be used to create a message from that template
    //
    // context.locale: String (`en`, locale for i18n)
    // context.tz: String (`UTC`, timezone)
    compileLodashTemplate,
    // Same as above only templateString is a filename to that template
    compileLodashFileTemplate,
    Mail }
from 'enmail';

/*
    variables automatically exposed to be used in a template
    (aside from directly passed variables to a template and template
    compiler as a context)

    __: (key: String, ...variables) -> String
        Translation function, internally using i18n. Identity fn by default.
    dateTimeFormat: (date: Date|String, tz: String) -> String
        Date formatter using context.locale
    currencyFormat: (n: Number, currency: String) -> String
        i18n-formatted currency
    [numberFormat]: TBA
*/

const templateString = `
<!DOCTYPE html>
<html>
    <body>
        <%= __('You can recover you password here') %>
        <%= url %>?token=<%= token %>
    </body>
</html>
`
const compiled = compileLodashTemplate(templateString, { url: 'http://api', token: '__TOKEN__' })
// <!DOCTYPE html>
// <html>
//     <body>
//         You can recover you password here
//         http://api?token=__TOKEN__
//     </body>
// </html>
const mail: Mail = {
    // ...
    content: compiled(),
    // ...
};
```

## Development

### Build

```bash
npm run build
```

It runs `tsc -p .`

### Testing

```bash
npm run test
```

### Lint

```bash
npm run lint
```

## License

This project is licensed under [MIT](./LICENSE).
