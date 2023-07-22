import { Module } from '@nestjs/common'
import { TagsService } from './tags.service'
import { TagsController } from './tags.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tag } from './entities/tag.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), AuthModule],
  exports: [TypeOrmModule],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
