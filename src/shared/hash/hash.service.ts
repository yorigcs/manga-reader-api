import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hash, HashCompare } from '../../contracts/cryptography/hash';

@Injectable()
export class HashService implements Hash, HashCompare {
  async hash(plainText: string) {
    const salt = 10;
    return await bcrypt.hash(plainText, salt);
  }

  async compare(plainText: string, cipherText): Promise<boolean> {
    return bcrypt.compare(plainText, cipherText);
  }
}
