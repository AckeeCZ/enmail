# Nodemailer

## Tutorials

- [Send mails with gmail OAuth 2.0](https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343)

## Settings

- [Nodemailer SMTP transport options](http://nodemailer.com/smtp/) `NodemailerOptions`

### Usage

```typescript
import enmail from 'enmail';

const body = {
    to: 'test@example.com',
    from: 'me@example.com',
    content: 'Hello enmail!',
    subject: 'Hello',
};
const options = {
    auth: {
        type: 'login',
        user: 'your@email.com',
        pass: 'yourpassword',
    },
    service: 'gmail',
};
const gmailAdapter = enmail.createAdapter.nodemailer(options);
enmail.send(body, gmailAdapter)
    .then(() => 'Email was sent!')
    .catch(error => console.log(error.message));
```

* Alternatively you can use adapter's `sender` to send an email:

```typescript
const gmailAdapter = enmail.createAdapter.nodemailer(options);
gmailAdapter.sender()(body)
    .then()
    .catch();

// Pass send options to it
const sendOptions = { bcc: 'email@example.com' }; // nodemailer Mail.options
gmailAdapter.sender(sendOptions)(body);
// or
gmailAdapter.sender()(body, sendOptions);
```

* You can also use original Nodemailer sender

```typescript
const gmailAdapter = enmail.createAdapter.nodemailer({ apiKey: 'YOUR_API_KEY' });
const sender = gmailAdapter.mailService; // Nodemailer instance
const { content, ...message } = body;
sender.send({ ...message, text: content })
    .then()
    .catch();
```