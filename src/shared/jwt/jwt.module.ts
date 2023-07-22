import { Module, type Provider } from '@nestjs/common'
import { JwtService } from './jwt.service'
import config from '../../configuration/env.config'
import { JWT_PROVIDES } from '../../constants'

const jwtAccessTokenProvider: Provider = {
  provide: JWT_PROVIDES.ACCESS_TOKEN,
  useFactory: () => {
    const { accessTokenSecret } = config().jwt
    return new JwtService(accessTokenSecret)
  }
}
@Module({
  providers: [jwtAccessTokenProvider],
  exports: [jwtAccessTokenProvider]
})
export class JwtModule {}
