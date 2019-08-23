# Gmail

## Tutorials

- [Send mails with gmail OAuth 2.0](https://medium.com/@RistaSB/use-expressjs-to-send-mails-with-gmail-oauth-2-0-and-nodemailer-d585bba71343)

## Settings

- Options `GmailOfficeOptions`:

```typescript
{
    authType: GmailAuthType;        // "login" or "oauth2" - enum
    settings: GmailAuthOptions;
    mailer?: any;
}
```

- When you choose `login` as `authType` then your settings should looks like:

```typescript
{
    user: string;
    pass: string;
}
```

- Or when you choose `oauth2`:

```typescript
{
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
}
```
