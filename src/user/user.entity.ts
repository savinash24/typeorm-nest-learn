import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Account } from 'src/account/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
