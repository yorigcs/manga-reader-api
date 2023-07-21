import { CanActivate, ExecutionContext, Inject, Type, mixin } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserPayload } from './auth.service';

export type Roles = 'user' | 'admin';
export const RolesGuard = (role: Roles): Type<CanActivate> => {
  class ScopeGuardMixin {
    constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request?.user as UserPayload;
      if (user === undefined || user === null) return false;
      const userSearch = await this.dataSource.getRepository(User).findOneBy({ id: user.id });
      return !(userSearch.role !== 'admin' && role === 'admin');
    }
  }
  return mixin(ScopeGuardMixin);
};
