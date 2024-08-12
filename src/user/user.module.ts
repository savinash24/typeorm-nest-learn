import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataSourceModule } from '../common/data-source.module'; // Import the DataSourceModule

@Module({
  imports: [DataSourceModule], // Import DataSourceModule to use DataSourceManager
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export UserService if needed in other modules
})
export class UserModule {}
