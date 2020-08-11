import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { logger } from './adeshaLogger.service';

@Catch()
  export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      const errorResponse = {
        code: status,
        timestamp: new Date().toLocaleDateString(),
        path: request.url,
        method: request.method,
        message:
          status !== HttpStatus.INTERNAL_SERVER_ERROR
            ? exception.message || null
            : 'Internal server error',
      };

      if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        logger.error({
            method: request.method,
            url: request.url,
            date: new Date(Date.now()).toLocaleTimeString(),
            Sender: 'HTTP_ERROR_FILTER',
            exceptionStack: exception.stack,
            exceptionFilter: 'ExceptionFilter',
        });
      } else {
        logger.error(
            {
                method: request.method,
                url: request.url,
                date: new Date(Date.now()).toLocaleTimeString(),
                Sender: 'HTTP_ERROR_FILTER',
                exceptionStack: JSON.stringify(errorResponse),
                exceptionFilter: 'ExceptionFilter',
            },
        );
      }

      response.status(status).json(errorResponse);
    }
  }
