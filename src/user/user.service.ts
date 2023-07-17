import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserEmailError } from './errors/user.email.error';

@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user !== null) throw new UserEmailError();
    await this.userRepository.save({ email, password, username });
    return 'User created!';
  }
}
