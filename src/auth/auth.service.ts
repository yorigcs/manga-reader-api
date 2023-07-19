import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { User } from '../user/entities/user.entity';
import { HashService } from '../shared/hash/hash.service';
import { IUser } from '../user/IUser';

export interface IUserAuth {
  user: Omit<IUser, 'password'>;
  accessToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}
  async withDefault(authDto: AuthDto): Promise<IUserAuth> {
    const { email, password } = authDto;
    const user = await this.userRepo.findOneBy({ email });
    const error = new BadRequestException("This email and password doesn't match");
    if (user === null) throw error;
    const isUserCredentialsValid = await this.hashService.compare(password, user.password);
    if (!isUserCredentialsValid) throw error;
    const accessToken = await this.jwtService.signAsync({ userId: user.id });
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
