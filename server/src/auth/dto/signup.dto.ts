import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/[A-Za-z]/, { message: 'At least one letter' })
  @Matches(/\d/, { message: 'At least one number' })
  @Matches(/[^A-Za-z0-9]/, { message: 'At least one special char' })
  password: string;
}
