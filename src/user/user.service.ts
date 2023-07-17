import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserEmailError } from './errors/user.email.error';
import { HashService } from '../shared/hash/hash.service';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private readonly userRepository: Repository<User>, private readonly hashService: HashService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user !== null) throw new UserEmailError();
    const hashedPassword = await this.hashService.hash(password);
    await this.userRepository.save({ email, password: hashedPassword, username });
    return 'User created!';
  }
}
