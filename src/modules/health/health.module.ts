import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller";

/**
 * Module responsible for monitoring the application's health and system resources.
 * Uses NestJS Terminus for health indicators.
 */
@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
})
export class HealthModule {}
