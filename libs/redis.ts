import * as redis from "redis";
import { Service } from "typedi";

@Service()
export class RedisService {
    private client: redis.RedisClientType<any>;
    private isConnect: boolean = false;

    constructor() {
        this.client = redis.createClient({
            url: "redis://localhost:6379",
        });
    }

    async connect() {
        await this.client.connect();
    }

    isConnected(): boolean {
        return this.isConnect;
    }

    async subscribe(channel: string, cb: (data: any) => void) {
        await this.client.subscribe(channel, cb);
    }

    async unsubscribe(channel: string, cb?: (data: any) => void) {
        await this.client.unsubscribe(channel, cb);
    }

    async publish(channel: string, data: any) {
        await this.client.publish(channel, data);
    }
}
