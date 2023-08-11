import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),

  HOST: Joi.string().required().default('localhost').description('SERVER IP'),
  PORT: Joi.string().required().default(3000).description('SERVER PORT'),

  //   // Mongodb
  //   MONGODB_HOST: Joi.string()
  //     .required()
  //     .default('localhost')
  //     .description('Mongo DB hostname'),
  //   MONGODB_PORT: Joi.string()
  //     .required()
  //     .default(27017)
  //     .description('Mongo DB port'),
  //   MONGODB_DB_NAME: Joi.string().required().description('Mongo DB name'),

  //   // MQTT
  //   MQTT_HOST: Joi.string()
  //     .required()
  //     .default('localhost')
  //     .description('MQTT host'),
  //   MQTT_PORT: Joi.number().required().default(1883).description('MQTT port'),
  //   MQTT_USERNAME: Joi.string().required().description('MQTT username'),
  //   MQTT_PASSWORD: Joi.string().required().description('MQTT password'),

  //   //Redis
  //   REDIS_HOST: Joi.string()
  //     .required()
  //     .default('localhost')
  //     .description('redis host'),
  //   REDIS_PORT: Joi.string().required().default(6379).description('redis port'),
  //   REDIS_TTL: Joi.string()
  //     .required()
  //     .default(864000)
  //     .description('redis time to live '),
});
