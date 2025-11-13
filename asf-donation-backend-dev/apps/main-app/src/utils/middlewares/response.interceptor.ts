import {catchError, map, Observable} from 'rxjs';
import {omit, get} from 'lodash';

import {CallHandler, ExecutionContext, HttpStatus, NestInterceptor} from '@nestjs/common';
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // get context, request and response
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const res = ctx.getResponse();

        // get the correlation id
        const correlation_id = req.headers['x-correlation-id'];

        return next.handle().pipe(
            map((value) => {
                if (req.method === 'POST') {
                    if (res.statusCode === HttpStatus.CREATED) {
                        res.status(HttpStatus.OK);
                    }
                }
                return value;
            }),
            catchError((error) => {
                // 把错误交给统一错误处理器
                throw error;
            }),
            map((data) => {
                if (data) {
                    return {
                        status: "success",
                        data: get(data, ['data']),
                        count: get(data, ['count']) || null,
                        message: data?.message,
                        tracking_id: correlation_id,
                        route: req.url,
                        timestamp: new Date().toISOString(),
                    };
                } else {
                    return data;
                }
            }),
        );
    }
}