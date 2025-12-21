import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, body, query, params } = request;
    const startTime = Date.now();

    this.logger.log(`[${method}] ${url} - Request started`);

    if (body && Object.keys(body as object).length > 0) {
      this.logger.debug(`Request body: ${JSON.stringify(body)}`);
    }

    if (query && Object.keys(query as object).length > 0) {
      this.logger.debug(`Request query: ${JSON.stringify(query)}`);
    }

    if (params && Object.keys(params as object).length > 0) {
      this.logger.debug(`Request params: ${JSON.stringify(params)}`);
    }

    return next.handle().pipe(
      tap((_) => {
        const duration = Date.now() - startTime;
        const statusCode = response.statusCode || 200;
        
        this.logger.log(
          `[${method}] ${url} - ${statusCode} - ${duration}ms - SUCCESS`,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        const statusCode = error?.status || error?.statusCode || 500;
        
        this.logger.error(
          `[${method}] ${url} - ${statusCode} - ${duration}ms - ERROR`,
        );
        
        this.logger.error(`Error: ${error?.message || 'Unknown error'}`);
        
        if (error?.stack) {
          this.logger.error(`Stack: ${error.stack}`);
        }
        
        if (error?.response) {
          this.logger.error(`Error response: ${JSON.stringify(error.response)}`);
        }
        
        return throwError(() => error as Error);
      }),
    );
  }

  private sanitizeData(data: any): any {
    if (!data) return data;
    
    const dataStr = JSON.stringify(data);
    if (dataStr.length > 1000) {
      return {
        ...data,
        _truncated: true,
        _length: dataStr.length,
      };
    }
    
    return data;
  }
}