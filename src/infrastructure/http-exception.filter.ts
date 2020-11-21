import { ExceptionFilter, HttpException, HttpStatus, ArgumentsHost, Catch, Logger } from '@nestjs/common';
import apm = require('elastic-apm-node');

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage: any = exception.getResponse ? exception.getResponse() : exception;

    const message = errorMessage.message || exception.message || null;
    const errorResponse = {
      code: status,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message,
    };

    Logger.error(
      `${request.method} ${request.url}`,
      exception.stack,
      'HttpExceptionFilter',
    );

    apm.captureError(exception, { message });
    response.status(status).json(errorResponse);
  }
}
