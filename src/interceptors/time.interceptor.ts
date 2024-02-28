import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { setTimeout } from 'timers/promises';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const now = Date.now();
    const httpContext = context.switchToHttp();

    await setTimeout(50);

    return next.handle().pipe(
      tap(() => {
        const response = httpContext.getResponse<Response>();

        const delay = Date.now() - now;
        response.setHeader('X-Response-Time', `${delay}ms`);
        response.locals.time = delay;
        // response.locals.user = 'test@test.com';
      }),
    );
  }
}
