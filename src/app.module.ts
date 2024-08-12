import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TenantMiddleware } from './common/tenant.middleware';
import { DataSourceModule } from './common/data-source.module';

@Module({
  imports: [ DataSourceModule,UserModule],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
