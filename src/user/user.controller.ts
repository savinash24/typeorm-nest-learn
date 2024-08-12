import { Controller, Get, Post, Body, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(@Req() req: Request): Promise<User[]> {
    return this.userService.findAll(req);
  }

  @Post()
  async createUser(@Req() req: Request, @Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(req, userData);
  }

  @Post('transactional')
  async createUserTransactional(
    @Req() req: Request,
    @Body() userData: Partial<User>,
  ): Promise<User> {
    return this.userService.transactionalMethod(req, async (entityManager) => {
      const userRepository = entityManager.getRepository(User);
      const user = userRepository.create(userData);
      return userRepository.save(user);
    });
  }
}
