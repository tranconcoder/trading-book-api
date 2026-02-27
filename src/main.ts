import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import { SERVER_PORT } from "@config/app.config";
import { AllExceptionsFilter } from "./core/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.listen(SERVER_PORT);
}
void bootstrap();
