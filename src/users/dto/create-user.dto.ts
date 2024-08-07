import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
