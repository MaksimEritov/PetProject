import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "dotenv";

import { AppModule } from "./app.module";

import { LogLevel, LogLevelForDevelopment } from "./constants/logLevel";

config();

async function bootstrap() {
    const FastifyAdapterInstance = new FastifyAdapter({
        logger: true,
    });
    FastifyAdapterInstance.enableCors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: "*",
    });

    const app = await NestFactory.create<NestFastifyApplication>(AppModule, FastifyAdapterInstance, {
        logger: process.env.NODE_ENV === "development" ? LogLevelForDevelopment : LogLevel,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            skipMissingProperties: true,
            skipNullProperties: true,
            skipUndefinedProperties: true,
        })
    );

    const config = new DocumentBuilder()
        .setTitle("FooBot API")
        .setDescription("FooBot 1.0 API description")
        .setVersion("3.0")
        .addTag("FooBot")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    app.enableShutdownHooks();

    await app.listen(3000, "localhost");

    Logger.log(`Application is running.`);
}
bootstrap();
