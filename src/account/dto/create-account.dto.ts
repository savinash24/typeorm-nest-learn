import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateAccountDTO {
  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
