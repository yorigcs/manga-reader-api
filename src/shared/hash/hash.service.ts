import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hash, HashCompare } from '../../contracts/cryptography/hash';

@Injectable()
export class HashService implements Hash, HashCompare {
  async hash({ plainText }: Hash.Input): Promise<Hash.Output> {
    const salt = 10;
    return await bcrypt.hash(plainText, salt);
  }

  async compare({ plainText, cipherText }: HashCompare.Input): Promise<HashCompare.Output> {
    return bcrypt.compare(plainText, cipherText);
  }
}
