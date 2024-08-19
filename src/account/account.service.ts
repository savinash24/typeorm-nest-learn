import { Body, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Account } from './account.entity';
import { Transaction } from 'src/transactions/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  //   constructor(
  //     @InjectRepository(User) private readonly userRepository: Repository<User>,
  //     @InjectRepository(Account)
  //     private readonly accountRepository: Repository<Account>,
  //     @InjectRepository(Transaction)
  //     private readonly transactionRepository: Repository<Transaction>,
  //   ) {}

  async createUserWithAccountAndTransaction(
    req,
    userDetails,
    accountDetails,
    transactionDetails,
  ) {
    console.log({
      userDetails,
      accountDetails,
      transactionDetails,
    });

    const user = new User();
    user.username = userDetails.username;
    user.email = userDetails.email;

    return req.dataSource.manager.transaction(async (trx) => {
      const savedUser = await trx.save(User, user);
      const account = new Account();
      account.user = savedUser;
      account.balance = accountDetails.balance;
      console.log({ account });

      const savedAccount = await trx.save(Account, account);
      const transaction = new Transaction();
      transaction.account = savedAccount;
      transaction.amount = transactionDetails.amount;
      console.log({ savedAccount, transaction });
      const balance = +(+savedAccount.balance + +transaction.amount);
      console.log({ balance });

      await Promise.all([
        trx.save(Transaction, transaction),
        trx.update(Account, savedAccount.account_id, {
          balance,
        }),
      ]);

      console.log(savedUser);
      return savedUser;
    });
  }
}
