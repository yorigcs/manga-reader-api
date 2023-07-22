import { Module, Provider } from '@nestjs/common';
import { AwsS3FileStorageService } from './aws-s3-file-storage.service';
import config from '../../configuration/env.config';
import { AWS_PROVIDES } from '../../constants';

const aswS3MangaReaderProvider: Provider = {
  provide: AWS_PROVIDES.S3.BUCKET_MANGA_READER,
  useFactory: () => {
    const { accessKeyId, secretAccessKey, region, bucket } = config().s3;
    return new AwsS3FileStorageService(accessKeyId, secretAccessKey, bucket, region);
  },
};
@Module({
  providers: [aswS3MangaReaderProvider],
  exports: [aswS3MangaReaderProvider],
})
export class AwsS3FileStorageModule {}
