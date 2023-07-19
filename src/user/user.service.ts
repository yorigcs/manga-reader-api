import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEmailError } from './errors/user.errors';
import { HashService } from '../shared/hash/hash.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, private readonly hashService: HashService) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, username } = createUserDto;
    const user = await this.userRepo.findOneBy({ email });
    if (user !== null) throw new UserEmailError();
    const hashedPassword = await this.hashService.hash(password);
    await this.userRepo.save({ username, email, password: hashedPassword });
    return 'User created!';
  }
}
