export default {
  secret_token: process.env.TOKEN_SECRET,
  expires_in_token: process.env.EXPIRES_IN_TOKEN || '15m',
  secret_refresh_token: process.env.REFRESH_TOKEN_SECRET,
  expires_in_refresh_token: '3d',
  expires_refresh_token_days: 3,

  apikey: process.env.WEBHOOK_APIKEY
}
