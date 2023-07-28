import { type CanActivate, type ExecutionContext, type Type, mixin, Inject } from '@nestjs/common'
import { type UserPayload } from './auth.service'
import { PrismaService } from '../prisma.service'

export type Roles = 'user' | 'admin'
export const RolesGuard = (role: Roles): Type<CanActivate> => {
  class ScopeGuardMixin {
    constructor (@Inject(PrismaService) private readonly prisma: PrismaService) {}
    async canActivate (context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest()
      const user = request?.user as UserPayload
      if (user === undefined || user === null) return false
      const userSearch = await this.prisma.user.findUnique({ where: { id: user.id } })
      return !(userSearch?.roles !== 'admin' && role === 'admin')
    }
  }
  return mixin(ScopeGuardMixin)
}
