import { NestFactory, HttpAdapterHost } from "@nestjs/core";
import { AppModule } from "./modules/app/app.module";
import appConfig, { SERVER_PORT } from "@config/app.config";
import type { ConfigType } from "@nestjs/config";
import { AllExceptionsFilter } from "./core/filters/all-exceptions.filter";
import { TransformInterceptor } from "./core/interceptors/transform.interceptor";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalInterceptors(new TransformInterceptor());

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);
  app.enableCors({
    origin: config.corsUrlList,
    credentials: true, // Allow cookies
  });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  await app.listen(SERVER_PORT);
}
void bootstrap();
