import { CanActivate, ExecutionContext, Inject, Type, mixin } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';

export type Roles = 'user' | 'admin';
export const RolesGuard = (role: Roles): Type<CanActivate> => {
  class ScopeGuardMixin {
    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const userId = request?.userId;
      if (userId === undefined || userId === null) return false;
      const user = await this.dataSource.getRepository(User).findOneBy({ id: userId });
      return !(user.role !== 'admin' && role === 'admin');
    }
  }
  return mixin(ScopeGuardMixin);
};
