import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { type AuthDto } from './dto/auth.dto'
import { HashService } from '../shared/hash/hash.service'
import { JwtService } from '../shared/jwt/jwt.service'
import { type IUser } from '../user/IUser'
import { JWT_PROVIDES } from '../constants'
import { PrismaService } from '../prisma.service'

export interface IUserAuth {
  user: Omit<IUser, 'password'>
  accessToken: string
}

export interface UserPayload {
  id: string
  username: string
}
@Injectable()
export class AuthService {
  constructor (
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
    @Inject(JWT_PROVIDES.ACCESS_TOKEN) private readonly jwtService: JwtService
  ) {}

  async withDefault (authDto: AuthDto): Promise<IUserAuth> {
    const { email, password } = authDto
    const user = await this.prisma.user.findUnique({ where: { email } })
    const error = new BadRequestException("This email and password doesn't match")
    if (user === null) throw error
    const isUserCredentialsValid = await this.hashService.compare({ plainText: password, cipherText: user.password })
    if (!isUserCredentialsValid) throw error
    const accessToken = await this.jwtService.generate<UserPayload>({ key: { id: user.id, username: user.username }, expirationInMs: 8 * 60 * 60 * 1000 })
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.roles
      },
      accessToken
    }
  }
}
