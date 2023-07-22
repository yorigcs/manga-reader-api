import { IsEmail, Length } from 'class-validator'

export class CreateUserDto {
  @Length(4, 20)
    username: string

  @IsEmail()
    email: string

  @Length(8, 40)
    password: string

  @Length(8, 40)
    confirmPassword: string
}
