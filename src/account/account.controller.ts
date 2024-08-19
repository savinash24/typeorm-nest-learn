import { Body, Controller, Post, Req } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { CreateAccountDTO } from './dto/create-account.dto';
import { CreateTransactionDTO } from 'src/transactions/dto/create-transaction.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('create')
  async createAccountTransaction(
    @Req() req: any,
    @Body('userDetails') userDetails: CreateUserDTO,
    @Body('accountDetails') accountDetails: CreateAccountDTO,
    @Body('transactionDetails') transactionDetails: CreateTransactionDTO,
  ) {
    return this.accountService.createUserWithAccountAndTransaction(
      req,
      userDetails,
      accountDetails,
      transactionDetails,
    );
  }
}
