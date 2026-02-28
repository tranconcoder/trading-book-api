export enum EEnvKey {
  // App config
  nodeEnv = "NODE_ENV",
  serverHost = "SERVER_HOST",
  serverPort = "SERVER_PORT",
  clientUrl = "CLIENT_URL",
  corsUrlList = "CORS_URL_LIST",

  // Google Oauth2
  googleOauth2ClientId = "GOOGLE_OAUTH2_CLIENT_ID",
  googleOauth2ClientSecret = "GOOGLE_OAUTH2_CLIENT_SECRET",
  googleOauth2CallbackUrl = "GOOGLE_OAUTH2_CALLBACK_URL",
  googleOauth2RedirectUiUrl = "GOOGLE_OAUTH2_REDIRECT_UI_URL",
  googleOauth2Scopes = "GOOGLE_OAUTH2_SCOPES",

  // VLUTE
  studentVluteEmailSuffix = "VLUTE_STUDENT_EMAIL_SUFFIX",

  // Database
  dbHost = "DB_HOST",
  dbPort = "DB_PORT",
  dbUser = "DB_USER",
  dbPassword = "DB_PASSWORD",
  dbName = "DB_NAME",

  // Redis
  redisHost = "REDIS_HOST",
  redisPort = "REDIS_PORT",
  redisPassword = "REDIS_PASSWORD",
  redisTtl = "REDIS_TTL",

  // JWT
  jwtAccessExpires = "JWT_ACCESS_EXPIRES",
  jwtRefreshExpires = "JWT_REFRESH_EXPIRES",
  jwtAccessAlgorithm = "JWT_ACCESS_ALGORITHM",
  jwtRefreshAlgorithm = "JWT_REFRESH_ALGORITHM",
}
