import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDTO {
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
