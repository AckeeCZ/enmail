# enmail

[![Build Status](https://travis-ci.org/AckeeCZ/enmail.svg?branch=master)](https://travis-ci.org/AckeeCZ/enmail)
[![Npm](https://img.shields.io/npm/v/enmail.svg?style=flat-square)](https://www.npmjs.com/package/enmail)
[![License](https://img.shields.io/github/license/AckeeCZ/enmail.svg?style=flat-square)](https://github.com/AckeeCZ/enmail/blob/master/LICENSE)

Handles message communication with end users through various means of messages - email, sms, chat messages using uniform API.

> Neither snow nor rain nor heat nor gloom of night stays these couriers from the swift completion of their appointed rounds

## Install

```bash
npm i --save enmail
```

## Supported services, their settings and examples

- [Gmail](./GMAIL.md)
- [Sendgrid](./SENDGRID.md)
- [Firebase Cloud Messaging](./FCM.md)
- [OneSignal](./ONESIGNAL.md)

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

## Used packages

- `nodemailer` - [https://nodemailer.com/about/](https://nodemailer.com/about/)
- `@sendgrid/mail` - [https://www.npmjs.com/package/@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail)

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
