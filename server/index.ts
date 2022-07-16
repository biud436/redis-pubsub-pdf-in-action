import "reflect-metadata";
import Container, { Service } from "typedi";
import { RedisService } from "../src/redis";
import * as path from "path";
import * as fs from "fs";

/**
 * @class ServerAplication
 */
@Service()
class ServerApplication {
    private redisClient: RedisService = Container.get(RedisService);

    async start() {
        await this.redisClient.connect();

        const content = await fs.promises.readFile(
            this.join("test.html"),
            "utf-8"
        );

        await this.redisClient.publish("start:convert-pdf", content);

        console.log("PDF 변환 작업이 시작되었습니다.");
    }

    join = (root: string) => {
        return path.resolve(__dirname, "..", "res", root);
    };
}

const app = Container.get(ServerApplication);
app.start();
