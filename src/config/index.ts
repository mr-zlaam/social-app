import "dotenv/config";

const _config = {
  PORT: process.env.PORT || 4000,
  ISDEVELOPMENT_ENVIRONMENT: true,
};
export const { PORT, ISDEVELOPMENT_ENVIRONMENT } = _config;
