import { Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { type Prisma } from '@prisma/client/extension'

const createPrismaExtended = (prisma: PrismaService) => prisma.$extends({
  model: {
    $allModels: {
      async findManyAndCount<Model, Args>(
        this: Model,
        args: Prisma.Exact<Args, Prisma.Args<Model, 'findMany'>>
      ): Promise<[Prisma.Result<Model, Args, 'findMany'>, number]> {
        return await Promise.all([
          (this as any).findMany(args),
          (this as any).count({ where: (args as any).where })
        ]) as any
      }
    }
  }
})

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private prisma: ReturnType<typeof createPrismaExtended>
  private readonly logger = new Logger(PrismaService.name)
  get extended () {
    if (!this.prisma) {
      this.prisma = createPrismaExtended(this)
    }

    return this.prisma
  }

  async onModuleInit () {
    await this.$connect()
    this.logger.log('DB connection established')
  }

  async onModuleDestroy () {
    await this.$disconnect()
    this.logger.log('DB connection closed')
  }
}
