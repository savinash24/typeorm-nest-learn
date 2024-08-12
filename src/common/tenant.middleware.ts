import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DataSourceManager } from './data-source.manager';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly dataSourceManager: DataSourceManager) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] as string;

    if (!tenantId) {
      return res.status(400).send('Tenant ID is required');
    }

    try {
      const dataSource = await this.dataSourceManager.getDataSource(tenantId);
      (req as any).dataSource = dataSource;
      next();
    } catch (error) {
      res.status(500).send('Failed to initialize database connection');
    }
  }
}
