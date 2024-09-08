import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  id: string; // id is required for password change

  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsNotEmpty()
  @MinLength(3)
  password_confirmation: string;
}
