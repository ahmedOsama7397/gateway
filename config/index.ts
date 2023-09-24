import dotenv from "dotenv";

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("no .env file found");
}

export default {
  dev: {
    port: parseInt(process.env.PORT as string, 10),
    AUTH_URL: process.env.AUTH_URL,
    USER_PAGE_URL: process.env.USER_PAGE_URL,
    CONSOLE_URL: process.env.CONSOLE_URL,
    GEO_URL: process.env.GEO_URL,
    PRODUCTS_URL: process.env.PRODUCTS_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    APP_URL: process.env.APP_URL,
  },
  rabbitMQ: {
    url: `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
    exchangeName: process.env.RABBITMQ_EXHANGENAME,
  },
};
