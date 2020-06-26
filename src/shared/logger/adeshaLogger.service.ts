import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: 'info.log', level: 'info'}),
    new winston.transports.File({ filename: 'error.log', level: 'error'}),
    new winston.transports.File({ filename: 'combined.log', format: winston.format.json() }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
