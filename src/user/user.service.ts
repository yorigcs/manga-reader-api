import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { type CreateUserDto } from './dto/create-user.dto'
import { HashService } from '../shared/hash/hash.service'

import { User } from './entities/user.entity'
import { type IUser } from './IUser'

export type IUserCreationResponse = Omit<IUser, 'password'>
@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private readonly userRepo: Repository<User>, private readonly hashService: HashService) {}
  async create (createUserDto: CreateUserDto): Promise<IUserCreationResponse> {
    const { email, password, username } = createUserDto
    const user = await this.userRepo.findOneBy({ email })
    if (user !== null) throw new ConflictException('This e-mail is already associated with an account.')
    const hashedPassword = await this.hashService.hash({ plainText: password })
    const newUser = new User()
    newUser.username = createUserDto.username
    newUser.email = createUserDto.email
    newUser.password = hashedPassword
    const userSaved = await this.userRepo.save(newUser)
    return {
      id: userSaved.id,
      email,
      username,
      role: userSaved.role
    }
  }
}
