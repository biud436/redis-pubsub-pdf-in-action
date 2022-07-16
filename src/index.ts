import "reflect-metadata";
import * as path from "path";
import * as fs from "fs";
import * as pdf from "html-pdf";
import { RedisService } from "./redis";
import Container from "typedi";

class Application {
    private redisClient: RedisService = Container.get(RedisService);

    constructor() {}

    async start() {
        await this.redisClient.connect();

        await this.redisClient.subscribe("start:convert-pdf", (content) => {
            console.log("PDF 변환 작업이 시작되었습니다.");

            this.toPDF(content, {
                format: "A4",
            }).then(async (e) => {
                await this.redisClient.unsubscribe("start:convert-pdf");
                console.log("변환이 완료되었음을 통지합니다");
                await this.redisClient.publish(
                    "end:convert-pdf",
                    "PDF 작업이 완료되었습니다."
                );
            });
        });
    }

    join(root: string) {
        return path.resolve(__dirname, "..", "res", root);
    }

    async toPDF(html: string, options: pdf.CreateOptions) {
        return new Promise((resolve, reject) => {
            pdf.create(html, options).toFile(
                this.join("test.pdf"),
                (err: any, res: any) => {
                    if (err) return console.log(err);

                    resolve("PDF 변환 작업이 완료되었습니다.");
                }
            );
        });
    }
}

const app = new Application();
app.start();
