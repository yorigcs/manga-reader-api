import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Hash } from '../../contracts/cryptography/hash';

@Injectable()
export class HashService implements Hash {
  async hash(plainText: string) {
    const salt = 10;
    return await bcrypt.hash(plainText, salt);
  }
}
