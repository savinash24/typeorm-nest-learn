import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DataSourceManager {
  private dataSources: Map<string, DataSource> = new Map();

  async getDataSource(tenantId: string): Promise<DataSource> {
    if (this.dataSources.has(tenantId)) {
      return this.dataSources.get(tenantId);
    }

    const dataSourceOptions: DataSourceOptions = {
      type: 'postgres', // or your preferred database type
      host: 'localhost',
      port: 5432,
      username: 'dbuser',
      password: 'dbpassword',
      database: tenantId,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: ['query', 'error'],
      extra: {
        max: 10, // maximum number of connections in the pool
        min: 2, // minimum number of connections in the pool
        idleTimeoutMillis: 30000, // how long a connection can be idle before being released
      },
    };

    const dataSource = new DataSource(dataSourceOptions);
    await dataSource.initialize();
    this.dataSources.set(tenantId, dataSource);
    return dataSource;
  }

  async closeDataSource(tenantId: string): Promise<void> {
    if (this.dataSources.has(tenantId)) {
      const dataSource = this.dataSources.get(tenantId);
      await dataSource.destroy();
      this.dataSources.delete(tenantId);
    }
  }
}
