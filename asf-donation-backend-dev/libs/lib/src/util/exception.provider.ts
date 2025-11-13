import {HttpException, HttpStatus} from '@nestjs/common';

export enum EExceptionCategory {
    BadRequest = 'BadRequest',
    Unauthorized = 'Unauthorized',
    NotFound = 'NotFound',
    InternalServerError = 'InternalServerError',
}

interface ExceptionType {
    code: number;
    message: string;
}

export const ExceptionTypes: Record<string, ExceptionType> = {
    code_question_message: {
        code: HttpStatus.BAD_REQUEST,
        message: 'Need to provide a valid question to the assistant.'
    },
    unauthorized: {
        code: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized',
    },
    rate_limited_daily: {
        code: HttpStatus.UNAUTHORIZED,
        message: 'You have reached the rate limit for this endpoint today.',
    },
    not_found: {
        code: HttpStatus.NOT_FOUND,
        message: 'Not Found',
    },
    internal_server_error: {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
    },
};


export class CustomExceptionProvider {
    public static throwException(payload: { messageType: keyof typeof ExceptionTypes }): void {
        this.createException(payload.messageType);
    }

    private static createException(messageType: string): HttpException {
        return new HttpException(
            ExceptionTypes[messageType].message,
            ExceptionTypes[messageType].code
        );
    }
}