import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  data: T;
  message?: string;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    
    return next.handle().pipe(
      map((data: any) => {
        // Set HTTP status code to always be 200
        if (response && typeof (response as { status?: unknown }).status === 'function') {
          (response as { status: (code: number) => void }).status(HttpStatus.OK);
        }

        return {
          statusCode: 200,
          message: 'Request successful',
          data: data ?? (Array.isArray(data) ? [] : {}),
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}