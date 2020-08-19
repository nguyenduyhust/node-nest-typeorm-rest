import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  @Interval(5000)
  handleCron() {
    this.logger.debug('Called every 5 seconds');
  }
}