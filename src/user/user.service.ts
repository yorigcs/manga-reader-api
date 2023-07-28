import { ConflictException, Injectable } from '@nestjs/common'
import { type CreateUserDto } from './dto/create-user.dto'
import { HashService } from '../shared/hash/hash.service'
import { type IUser } from './IUser'
import { PrismaService } from '../prisma.service'

export type IUserCreationResponse = Omit<IUser, 'password'>
@Injectable()
export class UserService {
  constructor (private readonly prisma: PrismaService, private readonly hashService: HashService) {}
  async create (createUserDto: CreateUserDto): Promise<IUserCreationResponse> {
    const { email, password, username } = createUserDto
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (user !== null) throw new ConflictException('This e-mail is already associated with an account.')
    const hashedPassword = await this.hashService.hash({ plainText: password })
    const userData = { username, email, password: hashedPassword }
    const userSaved = await this.prisma.user.create({ data: { ...userData, userStatus: { create: {} } } })
    return {
      id: userSaved.id,
      email,
      username,
      role: userSaved.roles
    }
  }
}
