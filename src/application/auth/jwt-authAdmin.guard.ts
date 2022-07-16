import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthAdminGuard extends AuthGuard('jwt') {
    handleRequest<TUser = any>(err: any, user: any, info: any, context: any, status?: any): TUser {
        if (err || !user || !user.isAdmin || user.deactivated) {
            throw err || new Error('You are not authorized to access this resource');
        }
        return user;
    }
}
