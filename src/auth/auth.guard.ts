import { type CanActivate, type ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { type Request } from 'express'
import { JwtService } from '../shared/jwt/jwt.service'
import { JWT_PROVIDES } from '../constants'
import { type UserPayload } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (@Inject(JWT_PROVIDES.ACCESS_TOKEN) private readonly jwtService: JwtService) {}
  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (token === undefined) throw new UnauthorizedException()
    try {
      request.user = await this.jwtService.validate<UserPayload>({ token })
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }

  private extractTokenFromHeader (request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
