export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  API_URL: process.env.API_URL || 'http://localhost:3000',
  SECRET: process.env.SECRET || 'kdp@n34ldn',
  TOKEN_EXPIRES: process.env.TOKEN_EXPIRES || 3600,
  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || '1d',
  // database
  DATABASE_TYPE: process.env.DATABASE_TYPE || 'NEED TO CONFIGURED',
  DATABASE_HOST: process.env.DATABASE_HOST || 'NEED TO CONFIGURED',
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'NEED TO CONFIGURED',
  MYSQL_USER: process.env.MYSQL_USER || 'NEED TO CONFIGURED',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'NEED TO CONFIGURED',
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT) || 'NEED TO CONFIGURED',
});