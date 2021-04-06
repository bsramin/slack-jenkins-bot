## SLACK SETUP

- Create new app in Slack ( https://api.slack.com/apps -> `Create new App` )
- Choose `Slack Command`
  - Command (es. `/do`)
  - Request url ( `https://xxxx.xxx/v1/slack/execute` ) `1*`
  - Escape channels, users, and links sent to your app => `OK`
- Install in your workspace
- Save the `Verification Token` in yout .env variable `SLACK_BOT_TOKEN`

---
`1*` `execute` is configurable in the .env variable `EXECUTE_PATH`
