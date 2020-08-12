# Sendgrid

- [https://sendgrid.com/](https://sendgrid.com/)

## Settings

- Options `SendgridOfficeOptions`:

```typescript
{
    apiKey: string;
}
```

### Usage

```typescript
import enmail from 'enmail';

const body = {
    to: 'test@example.com',
    from: 'me@example.com',
    content: 'Hello enmail!',
    subject: 'Hello',
};
const sendgridAdapter = enmail.createAdapter.sendgrid({ apiKey: 'YOUR_API_KEY' });
enmail.send(body, sendgridAdapter)
    .then(() => 'Email was sent!')
    .catch(error => console.log(error.message));
```

* Alternatively you can use adapter's `sender` to send an email:

```typescript
const sendgridAdapter = enmail.createAdapter.sendgrid({ apiKey: 'YOUR_API_KEY' });
sendgridAdapter.sender()(body)
    .then()
    .catch();

// Pass send options to it
const sendOptions = { mailSettings: { sandboxMode: { enable: true } } }; // sendgrid options
sendgridAdapter.sender(sendOptions)(body);
// or
sendgridAdapter.sender()(body, sendOptions);
```

* You can also use original Sendgrid sender

```typescript
const sendgridAdapter = enmail.createAdapter.sendgrid({ apiKey: 'YOUR_API_KEY' });
const sender = sendgridAdapter.mailService; // Sendgrid instance
const { content, ...message } = body;
sender.send({ ...message, html: content })
    .then()
    .catch();
```
