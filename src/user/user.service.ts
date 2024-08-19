import { Injectable, Inject } from '@nestjs/common';
import { DataSourceManager } from '../common/data-source.manager';
import { Request } from 'express';
import { DataSource, EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  // constructor(@Inject(DataSourceManager) private readonly dataSourceManager: DataSourceManager) {}

  private getDataSourceFromRequest(req: Request): DataSource {
    return (req as any).dataSource;
  }

  async findAll(req: Request): Promise<User[]> {
    const dataSource = this.getDataSourceFromRequest(req);
    const userRepository = dataSource.getRepository(User);
    return userRepository.find();
  }

  async createUser(req: Request, userData: Partial<User>): Promise<User> {
    const dataSource = this.getDataSourceFromRequest(req);
    const userRepository = dataSource.getRepository(User);
    const user = userRepository.create(userData);
    return userRepository.save(user);
  }

  async transactionalMethod(req: Request, callback: (entityManager: EntityManager) => Promise<any>): Promise<any> {
    const dataSource = this.getDataSourceFromRequest(req);
    return dataSource.transaction(async (entityManager) => {
      return callback(entityManager);
    });
  }
}
