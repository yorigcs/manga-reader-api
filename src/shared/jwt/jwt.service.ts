import { Injectable } from '@nestjs/common'
import { type JwtPayload, sign, verify } from 'jsonwebtoken'
import { type TokenGenerator, type TokenValidator } from '../../contracts/cryptography/token'

@Injectable()
export class JwtService implements TokenGenerator, TokenValidator {
  constructor (private readonly tokenSecret: string) {}
  async generate<T = string>({ key, expirationInMs }: TokenGenerator.Input<T>): Promise<TokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000
    return sign({ key }, this.tokenSecret, { expiresIn: expirationInSeconds })
  }

  async validate<T = string>({ token }: TokenValidator.Input): Promise<TokenValidator.Output<T>> {
    const payload = verify(token, this.tokenSecret) as T as JwtPayload
    return payload.key
  }
}
