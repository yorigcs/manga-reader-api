import { Injectable } from '@nestjs/common'
import { S3 } from '@aws-sdk/client-s3'
import { type UploadFile } from '../../contracts/storage/file-storage'

@Injectable()
export class AwsS3FileStorageService implements UploadFile {
  private readonly s3: S3
  constructor (
    private readonly accessKeyId: string,
    private readonly secretAccessKey: string,
    private readonly bucket: string,
    private readonly region: string
  ) {
    this.s3 = new S3({ credentials: { accessKeyId: this.accessKeyId, secretAccessKey: this.secretAccessKey }, region: this.region })
  }

  async upload ({ file, fileName }: UploadFile.Input): Promise<UploadFile.Output> {
    await this.s3.putObject({ Bucket: this.bucket, Key: fileName, Body: file, ACL: 'public-read' })
    return `https://${this.bucket}.s3.amazonaws.com/${fileName}`
  }
}
