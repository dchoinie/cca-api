import { IsEmail, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
