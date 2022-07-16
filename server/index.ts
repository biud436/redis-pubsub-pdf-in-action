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

        console.log("PDF 서버로 HTML 파일을 보냈습니다");

        await this.redisClient.publish("start:convert-pdf", content);

        await this.redisClient.subscribe("end:convert-pdf", (content) => {
            console.log(content);

            this.redisClient.unsubscribe("end:convert-pdf");
        });
    }

    join = (root: string) => {
        return path.resolve(__dirname, "..", "res", root);
    };
}

const app = Container.get(ServerApplication);
app.start();
