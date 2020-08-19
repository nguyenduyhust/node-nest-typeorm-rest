export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    environment: process.env.NODE_ENV || 'development',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    auth: {
      secret: process.env.SECRET || 'kdp@n34ldn',
      tokenExpires: process.env.TOKEN_EXPIRES || 3600,
      refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES || '1d',
    }
  },
  database: {
    type: process.env.DATABASE_TYPE || 'NEED TO CONFIGURED',
    host: process.env.DATABASE_HOST || 'NEED TO CONFIGURED',
    port: parseInt(process.env.MYSQL_PORT) || 'NEED TO CONFIGURED',
    name: process.env.MYSQL_DATABASE || 'NEED TO CONFIGURED',
    username: process.env.MYSQL_USER || 'NEED TO CONFIGURED',
    password: process.env.MYSQL_PASSWORD || 'NEED TO CONFIGURED',
  },
});