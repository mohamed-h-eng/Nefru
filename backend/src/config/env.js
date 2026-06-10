import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nefru',
  emailAdmin: process.env.EMAIL_ADMIN || 'superadmin@nefru.com',
  passwordAdmin: process.env.PASSWORD_ADMIN || 'superpassword',
};
