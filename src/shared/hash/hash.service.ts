import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { type Hash, type HashCompare } from '../../contracts/cryptography/hash'

@Injectable()
export class HashService implements Hash, HashCompare {
  async hash ({ plainText }: Hash.Input): Promise<Hash.Output> {
    const salt = 10
    return await bcrypt.hash(plainText, salt)
  }

  async compare ({ plainText, cipherText }: HashCompare.Input): Promise<HashCompare.Output> {
    return await bcrypt.compare(plainText, cipherText)
  }
}
