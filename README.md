# SendGrid Contact Form

![SendGrid Contact Form](/img/sendgrid-contact-form.png 'SendGrid Contact Form')

## Getting Started

1. Create an account on [Twilio SendGrid](https://www.twilio.com/en-us/sendgrid/email-api) and get an API key.
2. Create a verified email address on the platform
3. Then, clone/download the repo to your computer and install the dependencies with this command:

```shell
npm install
# or
yarn install
```

Add the API KEY to a `.env.local` file in the root folder like this:

```shell
NEXT_PUBLIC_SENDGRID_API_KEY=Your_API_Key
```

Now run the development server with one of these commands:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.
