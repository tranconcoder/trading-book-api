import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from "@nestjs/terminus";

/**
 * Controller for application health checks.
 * Integrates with NestJS Terminus to provide detailed system status.
 */
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

  /**
   * Performs a comprehensive health check of the application.
   * Checks:
   * - Heap memory usage (limit: 300MB)
   * - RSS memory usage (limit: 300MB)
   * - Disk storage usage (limit: 50% threshold on root path)
   * @returns A health check result object.
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // The process should not use more than 300MB memory
      () => this.memory.checkHeap("memory_heap", 300 * 1024 * 1024),
      // The process should not use more than 300MB RSS memory
      () => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024),
      // The disk usage should not exceed 50% of the available space
      () =>
        this.disk.checkStorage("storage", {
          thresholdPercent: 0.5,
          path: "/",
        }),
    ]);
  }
}
