import { IsEmail, IsNotEmpty, IsBoolean, IsString, MinLength } from 'class-validator';

export class UserRegistrationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  password_confirmation: string;

  @IsNotEmpty()
  @IsBoolean()
  tc: boolean;
}
