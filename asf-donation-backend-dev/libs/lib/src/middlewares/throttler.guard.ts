import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import {get} from "lodash";

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
    protected errorMessage = 'You have reached the maximum number of requests. Please try again later.';
    protected async getTracker(req: Record<string, any>): Promise<string> {
        const ip = get(req, 'headers.x-forwarded-for', get(req, 'connection.remoteAddress', ''));
        if (!ip) {
            throw new UnauthorizedException('Unable to determine the IP address');
        }

        return ip;
    }
}