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
import {
    createOffice,
    getOffice,
    Mail,
    MailType,
    ServiceType 
} from 'enmail';

// Create an office with your sendgrid `apiKey`
createOffice({
    service: ServiceType.gmail,
    settings: {
        apiKey: 'your_api_key',
    },
});

// Prepare an email
const mail: Mail = {
    from: 'me@gmail.com',
    to: 'example@test.org',
    type: MailType.HTML, // MailType.TEXT
    subject: 'Hello, its me',
    content: `<p>I was wondering if after all these years you'd like to meet to go over everything ...</p>`,
    // optional: mailerOptions
};

// Send it
getOffice()
    .send(mail)
    .then(res => /* ... */)
    .catch(e => /* ... */)
```
