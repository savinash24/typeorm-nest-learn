import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Account } from 'src/account/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transaction_date: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;
}
