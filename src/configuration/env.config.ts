// noinspection JSUnresolvedReference

export default () => ({
  port: parseInt(process.env.PORT ?? '3000'),
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET ?? ''
  },
  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    region: process.env.S3_REGION ?? '',
    bucket: process.env.S3_BUCKET ?? ''
  }
})
