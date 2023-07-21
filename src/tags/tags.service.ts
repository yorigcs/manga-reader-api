import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private readonly tagsRepo: Repository<Tag>) {}
  async create(createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    await this.tagsRepo.save({ name });
    return 'Tag created!';
  }

  findAll() {
    return this.tagsRepo.find();
  }
}
