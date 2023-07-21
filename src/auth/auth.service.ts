import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from '../user/entities/user.entity';
import { HashService } from '../shared/hash/hash.service';
import { JwtService } from '../shared/jwt/jwt.service';
import { IUser } from '../user/IUser';
import { JWT_PROVIDES } from '../constants';

export interface IUserAuth {
  user: Omit<IUser, 'password'>;
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly hashService: HashService,
    @Inject(JWT_PROVIDES.ACCESS_TOKEN) private readonly jwtService: JwtService,
  ) {}
  async withDefault(authDto: AuthDto): Promise<IUserAuth> {
    const { email, password } = authDto;
    const user = await this.userRepo.findOneBy({ email });
    const error = new BadRequestException("This email and password doesn't match");
    if (user === null) throw error;
    const isUserCredentialsValid = await this.hashService.compare({ plainText: password, cipherText: user.password });
    if (!isUserCredentialsValid) throw error;
    const accessToken = await this.jwtService.generate({ key: user.id.toString(), expirationInMs: 30 * 60 * 60 });
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken,
    };
  }
}
