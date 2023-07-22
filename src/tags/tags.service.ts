import { ConflictException, Injectable } from '@nestjs/common'
import { type CreateTagDto } from './dto/create-tag.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TagsService {
  constructor (@InjectRepository(Tag) private readonly tagsRepo: Repository<Tag>) {}
  async create (createTagDto: CreateTagDto) {
    const { name } = createTagDto
    const tag = await this.tagsRepo.findOneBy({ name })
    if (tag !== null) throw new ConflictException('This tag name already exists!')
    const newTag = new Tag()
    newTag.name = createTagDto.name
    await this.tagsRepo.save(newTag)
    return 'Tag created!'
  }

  async findAll () {
    return await this.tagsRepo.find()
  }
}
