# Gmail

## Tutorials

- [Send mails with gmail OAuth 2.0](https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343)

## Settings

- Options `GmailOfficeOptions`:

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
    mailer?: any;
}
```
