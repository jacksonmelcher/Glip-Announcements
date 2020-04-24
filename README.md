# Glip-Announcements

This bot is in very early stages of development.

This info was copied directly from Tyler's [Repo](https://github.com/tylerlong/glip-ping-chatbot). I changed some commands.

This is currently in production and will only work locally.

### Clone Repo

```
git clone https://github.com/jacksonmelcher/Glip-Announcements.git
```

### Install dependencies

```
yarn install
```

### Start ngrok to get a public address

This step is optional if you have other ways to get your bot a public address. For example, you might have an VPS with public IP address. But ngrok is pretty handy during development phase:

```
yarn ngrok
```

Please take a note of the public address with scheme "https", it should be in the form of `https://xxxxx.ngrok.io`. We will need it soon.

Port 3000 is where we run our bot's Express.js process.

In content below, we call this public address `https://<chatbot-server>`.

### Create a RingCentral app

This [link](https://developer.ringcentral.com/new-app?name=Sample+Bot+App&desc=A+sample+app+created+for+the+javascript+chatbot+framework&public=true&type=ServerBot&permissions=ReadAccounts,EditExtensions,SubscriptionWebhook,Glip&redirectUri=https://%3Cchatbot-server%3E/bot/oauth) will quickly create a bot with all the necessary permissions

Redirect URI should be set to `https://<chatbot-server>/bot/oauth`.

### Specify environment variables:

Create `.env` files:

```
cp .express.env .env
```

- `RINGCENTRAL_SERVER`, use https://platform.dev.ringcentral.com for sandbox and https://platform.ringcentral.com for production
- `RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI`, please sepcify connection URI to a relational database.
  - It is recommended to use SQLite for development: `sqlite://./db.sqlite`
- `RINGCENTRAL_CHATBOT_CLIENT_ID` & `RINGCENTRAL_CHATBOT_CLIENT_SECRET` could be found in the newly created RingCentral app.
- `RINGCENTRAL_CHATBOT_SERVER` is the public address generated by ngrok
  - For example, https://xxxxx.ngrok.io
  - For produciton, you might put your app behind nginx/apache and use the public address of those HTTP servers.
- `RINGCENTRAL_CHATBOT_EXPRESS_PORT` is the port we used for Express.js. It should match the ngrok command above.
- `RINGCENTRAL_CHATBOT_ADMIN_USERNAME` & `RINGCENTRAL_CHATBOT_ADMIN_PASSWORD` are the admin username and password.
  - Admin is the bot admin. It's normally the bot creator or maintainer.

### Start the bot

```
yarn dev
```

### Create database tables

```
curl -X PUT -u admin:password https://<chatbot-server>/admin/setup-database
```

`admin` & `password` are defined in `.env` file we created above.

For more information, please read [setup database](https://github.com/tylerlong/ringcentral-chatbot-js#setup-database).

### Add the bot to Glip

Follow these steps to [add](https://github.com/tylerlong/glip-ping-chatbot/tree/master#add-the-bot-to-glip) the bot to Glip.

### Test the bot

1. Create a new team.
2. Add the bot to the team.
3. In a direct message to the bot write: `Remind @created_team -m <Reminder messsage>`
