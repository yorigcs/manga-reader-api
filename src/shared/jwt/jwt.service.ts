import { Injectable } from '@nestjs/common';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { TokenGenerator, TokenValidator } from '../../contracts/cryptography/token';

@Injectable()
export class JwtService implements TokenGenerator, TokenValidator {
  constructor(private readonly tokenSecret: string) {}
  async generate({ key, expirationInMs }: TokenGenerator.Input): Promise<TokenGenerator.Output> {
    const expirationInSeconds = expirationInMs / 1000;
    return sign({ key }, this.tokenSecret, { expiresIn: expirationInSeconds });
  }

  async validate({ token }: TokenValidator.Input): Promise<TokenValidator.Output> {
    const payload = verify(token, this.tokenSecret) as JwtPayload;
    return payload.key;
  }
}
