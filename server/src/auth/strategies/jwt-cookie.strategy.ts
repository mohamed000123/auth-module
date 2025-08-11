import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { COOKIE_NAME } from '../../common/constants';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy, 'jwt-cookie') {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies && req.cookies[COOKIE_NAME]) {
          return req.cookies[COOKIE_NAME];
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
      passReqToCallback: false, 
    });
  }

  async validate(payload: any) {
    console.log(payload);
    
    return { userId: payload.id };
  }
}
