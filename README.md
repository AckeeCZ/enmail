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

```javascript

const {
    // Creates an office given the options, see below, and saves
    // instance under given key. If none key given, is saved under a default name.
    createOffice,
    // Gets office by key. Called without parameters, gets the default instance.
    getOffice,
    // Mail objet providing universal message container used throughout
    // all the offices
    Mail,
} = require('enmail');

const office = createOffice(
    'gmail',
    { user: '...', password: '...' }
);

const mail = new Mail();
mail.from = 'senderContact';
mail.to = 'receiverContact';
mail.subject = 'mesasgeSubject';
mail.content = 'messageTextContent';
mail.type = Mail.TYPE; // Mail.HTML

getOffice().send(mail)
```


## Supported transports and ini options

 - `gmail`
    ```js
    {
        user: String,
        password: String
    }
    ```
 - `sendgrid`
    ```js
    {
        apiKey: String
    }
    ```
 - `profisms`
    ```javascript
    {
        environment: 'test' | 'sms'
        service: 'general' | 'sms' // https://document.profisms.cz/index.php?CTRL=api_common
        login: String,
        password: String,
        source: String, // optional, default is ProfiSMS phone number, possible values are registered phone number or registered text ID, https://document.profisms.cz/index.php?CTRL=api_sms
        currency: String // optional, default is CZK
        debug: false, // optional, default is false
        logger: function // optional, default is console
    }
    ```
 - (N/A) `slack?`
 - `fcm`
    ```js
    {
        authorizationKey: String
    }
    ```
- `onesignal`
    ```js
    {
        apiKey: String,
        appId: String
    }
    ```

### FCM

```js
// Channel send: Recipient `channel=<channelName>`
send({ to: `channel=myChannelName`/*, ...*/ });
// Device notification (registration ids). May be an array.
send({ to: `3qwesdfzklxc`/*, ...*/ });
```
`Mail.subject` is used as the `notification.title`, `Mail.body` as the message `notification.content`.

Any other options that should be passed to request should be put to `Mail.mailerOptions`. Those are merged with the root of fcm request. E.g., to supply data and sound, use
```js
mail.mailerOptions = {
    data: {/* ... */},
    notification: { sound: 'default' }
}
```

If you dont want to use the `notification` object, you can set it on `null` then `notification` object will be ignored.

### OneSignal

```js
// Channel/Segment send: Recipient `channel=<channelName>`. May be an array.
send({ to: `channel=myChannelName`/*, ...*/ });
// Device notification (player ids). May be an array.
send({ to: `3qwesdfzklxc`/*, ...*/ });
```
Any other options that should be passed to request should be put to `Mail.mailerOptions`. Those are merged with the root of OneSignal request body. E.g., to supply filters and sound, use
```js
mail.mailerOptions = {
    filters: [/* ... */],
    android_sound: 'default',
}
```



## Concept

Formerly an email sender, generally a message sender. Emails - electronic mails, letters... letters are sent and delivered by a post office, thus office is the key hub for sending those messages.

Office have to be built first. Once built, offce can _send_ a message.


## Helpers


### Templates

```javascript

const {
    // (templateString, context) Given template string
    // (https://lodash.com/docs/4.17.4#template) and variables, function compiles
    // this template and can later be used to create a message from that template
    //
    // context.locale: String (`en`, locale for i18n)
    // context.tz: String (`UTC`, timezone)
    compileLodashTemplate,
    // Same as above only templateString is a filename to that template
    compileLodashFileTemplate,
} = require('enmail');

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
const compiled = compileLodashTemplate(templateString, { url: 'http://api' })
compiled({ token: '__TOKEN__' })
// <!DOCTYPE html>
// <html>
//     <body>
//         You can recover you password here
//         http://api?token=__TOKEN__
//     </body>
// </html>



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
