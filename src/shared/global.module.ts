import { Global, Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { JwtModule } from './jwt/jwt.module'
import { HashModule } from './hash/hash.module'
import { AwsS3FileStorageModule } from './storage/aws-s3-file-storage.module'
import { UuidModule } from './uuid/uuid.module'
import { AuthModule } from '../auth/auth.module'

@Global()
@Module({
  imports: [JwtModule, HashModule, AwsS3FileStorageModule, UuidModule, AuthModule],
  providers: [PrismaService],
  exports: [PrismaService, JwtModule, HashModule, AwsS3FileStorageModule, UuidModule, AuthModule]
})
export class GlobalModule {}
