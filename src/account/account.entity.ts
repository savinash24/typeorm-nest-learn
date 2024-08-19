import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/user.entity';
import { Transaction } from 'src/transactions/transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
