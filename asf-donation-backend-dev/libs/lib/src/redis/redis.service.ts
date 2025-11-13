import {Injectable, Logger} from "@nestjs/common";
import {InjectRedis} from "@songkeys/nestjs-redis";
import {Redis} from "ioredis";
import REDIS_CONSTANCT from "@app/lib/redis/redis.contant";


export enum RedisPrefixType {
    SESSION = "session_",
    USER_CACHE = "user_cache_",
    EVENT_CACHE = "event_cache_",
    INFO_CACHE = "info_cache_",
    DISTRIBUTE_LOCK = "distribute_lock_",
}
@Injectable()
export class RedisService {
    private readonly logger = new Logger(RedisService.name);

    constructor(
        @InjectRedis(REDIS_CONSTANCT().REDIS_USER_SESSION)
        private redisSessionService: Redis,
        @InjectRedis(REDIS_CONSTANCT().REDIS_CACHE)
        private redisCacheService: Redis,
    ) {
        this.logger.warn("RedisService initialized");
    }

    //--------------------------------------------------- Redis Service getter
    getRedisSessionService(): Redis {
        return this.redisSessionService;
    }

    getRedisCacheService(): Redis {
        return this.redisCacheService;
    }

    //--------------------------------------------------- Redis Session Service
    // expire 单位是秒 这里会期待从外部传入的expire，而在main-app中 其实是有一个env配置专门用来设置session的过期时间
    setSession(payload:{
        token: string,
        user_session: string,
        expire: number}
    ): Promise<string> {
        return this.redisSessionService.set(RedisPrefixType.SESSION + payload.token, payload.user_session, "EX", payload.expire);
    }

    async getSession(token: string): Promise<string | null> {
        return this.redisSessionService.get(token).then((res) => {
            return res ? res : null;
        });
    }

    async delSession(token: string): Promise<number> {
        return this.redisSessionService.del(token);
    }

    //--------------------------------------------------- Redis Cache Service
    async setCache(payload: {prefix: RedisPrefixType , key: string, value: unknown, expire: number }) {
        this.redisCacheService.set(
            payload.prefix + payload.key,
            JSON.stringify(payload.value),
            "EX",
            payload.expire,
        );
    }

    async getCache(key: string): Promise<unknown | null> {
        return this.redisCacheService.get(key).then((res) => {
            return res ? JSON.parse(res) : null;
        });
    }

    async setCaches(
        payload: Array<{ key: string; value: unknown; expire: number }>,
    ) {
        // 理解成Mysql的事务吧 一次性写入多个key-value
        const pipeline = this.redisCacheService.pipeline();
        payload.forEach((item) => {
            pipeline.set(item.key, JSON.stringify(item.value), "EX", item.expire);
        });
        await pipeline.exec();
    }

    async getCaches(keys: string[]): Promise<unknown[]> {
        const result = await this.redisCacheService.mget(keys);
        return result.map((item) => JSON.parse(item));
    }

    async delCaches(keys: string[]): Promise<number> {
        return this.redisCacheService.del(...keys);
    }

    //--------------------------------------------------- Redis Lock Service
    async lock(key: string, expire: number): Promise<boolean> {
        // NX: set the key if it does not exist
        return this.redisCacheService.set(RedisPrefixType.DISTRIBUTE_LOCK + key, "lock", "EX", expire, "NX").then((res) => {
            return res === "OK";
        });
    }

    async unlock(key: string): Promise<number> {
        return this.redisCacheService.del(RedisPrefixType.DISTRIBUTE_LOCK + key);
    }

    async getLock(key: string): Promise<string | null> {
        return this.redisCacheService.get(RedisPrefixType.DISTRIBUTE_LOCK + key).then((res) => {
            return res;
        });
    }

    async extendLock(key: string, expire: number): Promise<boolean> {
        return this.redisCacheService.expire(RedisPrefixType.DISTRIBUTE_LOCK + key, expire).then((res) => {
            return res === 1;
        });
    }
}
