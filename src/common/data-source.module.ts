import { Module, Global } from '@nestjs/common';
import { DataSourceManager } from './data-source.manager';

@Global()
@Module({
  providers: [DataSourceManager],
  exports: [DataSourceManager],
})
export class DataSourceModule {}
