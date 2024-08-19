import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;
}
