import { ConflictException, Injectable } from '@nestjs/common'
import { type CreateTagDto } from './dto/create-tag.dto'
import { PrismaService } from '../prisma.service'

@Injectable()
export class TagsService {
  constructor (private readonly prisma: PrismaService) {
  }

  async create (createTagDto: CreateTagDto) {
    const { name } = createTagDto
    const tag = await this.prisma.tag.findUnique({ where: { name } })
    if (tag !== null) throw new ConflictException('This tag name already exists!')

    await this.prisma.tag.create({ data: { name } })
    return 'Tag created!'
  }

  async findAll () {
    return this.prisma.tag.findMany({ orderBy: { name: 'asc' } })
  }
}
