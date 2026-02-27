import { Controller, Get } from "@nestjs/common";
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
  ) {}

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
