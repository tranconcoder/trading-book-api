import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { SERVER_PORT } from "./modules/app/app.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);
}
bootstrap();
