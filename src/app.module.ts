import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TenantMiddleware } from './common/tenant.middleware';
import { DataSourceModule } from './common/data-source.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';

@Module({
  imports: [DataSourceModule, UserModule, AccountModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude({ path: '/health', method: RequestMethod.GET })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
