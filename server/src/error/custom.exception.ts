import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

const getStatusCode = (exception: any): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

const getStatus = (statusCode: number) =>
  statusCode.toString().startsWith('4') ? 'fail' : 'error';

const getErrorMessage = (exception: any): string => {
  return String(exception);
};

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = getStatusCode(exception);
    const status = getStatus(statusCode);
    const message = getErrorMessage(exception);

    response.status(statusCode).json({
      status,
      message,
    });
  }
}
