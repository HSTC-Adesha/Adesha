import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logger } from './adeshaLogger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        const req = context.switchToHttp().getRequest();
        if (req) {
            const method = req.method;
            const url = req.url;
            const mesage = {
                method,
                url,
                date: new Date(Date.now()).toLocaleTimeString(),
                Sender: 'Log_http_interceptor',
                duration: Date.now() - now + 'ms',
                class: context.getClass().name,
                handler: context.getHandler().name,
            };
            return next
                .handle()
                .pipe(
                    tap(() =>
                        logger.info(mesage),
                    ),
                );
        }
    }
}
