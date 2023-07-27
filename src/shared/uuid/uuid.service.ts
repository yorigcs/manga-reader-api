import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { type UuidGenerate } from '../../contracts/cryptography/uuid'

@Injectable()
export class UuidService implements UuidGenerate {
  generate ({ key }: UuidGenerate.Input): UuidGenerate.Output {
    return key !== undefined ? `${key}-${v4()}` : v4()
  }
}
