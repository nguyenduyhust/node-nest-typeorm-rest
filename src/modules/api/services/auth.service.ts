import { Injectable, Inject } from '@nestjs/common';;
import { User } from '@api/entities';
import { TokenHelper, ErrorHelper, EncryptHelper } from '@base/helpers';
import { CONFIGURATION_KEYS } from '@config';
import { UserService } from '@api/services';
import { TokenPayload } from '@api/interfaces';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {

  constructor(
    @Inject('UserService')
    private userService: UserService,
    private config: ConfigService,
  ) { }

  async login(identity: string, password: string) {
    try {
      // find user
      const user = await this.userService.findOneByUsername(identity);
      if (!user) {
        ErrorHelper.BadRequestException('User does not exist');
      }
      if (!await EncryptHelper.compare(password, user.password)) {
        ErrorHelper.BadRequestException('Password was wrong');
      }
      return await this.generatedAccessToken(user);
    } catch (error) {
      ErrorHelper.BadRequestException('');
    }
  }

  async verifyRefreshToken(refreshToken: string) {
    try {
      const tokenObject = await TokenHelper.verify<TokenPayload>(refreshToken, `refresh_${this.config.get(CONFIGURATION_KEYS.SECRET)}`);
      await this.checkToken(tokenObject);
      const user = await this.userService.findOneById(tokenObject.user_id);
      this.checkUser(user);
      // no error, generated new access token
      return this.generatedAccessToken(user, refreshToken);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ErrorHelper.BadRequestException('Token expired');
      }
      ErrorHelper.UnauthorizedException('Invalid token');
    }
  }

  async generatedAccessToken(user: User, refresh_token = '') {
    const tokenObj = await TokenHelper.generate({
      user_id: user.id
    }, this.config.get(CONFIGURATION_KEYS.SECRET), parseInt(this.config.get(CONFIGURATION_KEYS.TOKEN_EXPIRES)));
    const refreshTokenObj = await TokenHelper.generate({
      user_id: user.id
    }, `refresh_${this.config.get(CONFIGURATION_KEYS.SECRET)}`, this.config.get(CONFIGURATION_KEYS.REFRESH_TOKEN_EXPIRES));

    return {
      token: tokenObj.token,
      expires: tokenObj.expires * 1000, // convert from seconds to miliseconds
      refresh_token: refresh_token.length > 0 ? refresh_token : refreshTokenObj.token,
      user: classToPlain(user),
    };
  }

  async verifyUser(token: string): Promise<User> {
    try {
      const tokenObject = await TokenHelper.verify<TokenPayload>(token, this.config.get(CONFIGURATION_KEYS.SECRET));
      await this.checkToken(tokenObject);
      const user = await this.userService.findOneById(tokenObject.user_id);
      this.checkUser(user);
      return user;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        ErrorHelper.BadRequestException('Token expired');
      }
      ErrorHelper.UnauthorizedException('Invalid token');
    }
  }

  checkToken(tokenObject: TokenPayload) {
    if (!tokenObject || !tokenObject.user_id) {
      ErrorHelper.UnauthorizedException('Invalid token');
    }
  }

  checkUser(user: User) {
    if (!user) {
      ErrorHelper.BadRequestException('Invalid token');
    }
  }

  async validateRequest(req: Request): Promise<User> {
    const authorization = req.headers.authorization ? req.headers.authorization : 'Bearer ';
    const authHeaders = (authorization as string).split(' ');
    if (authHeaders.length == 2 && authHeaders[0] == 'Bearer' && authHeaders[1] != '') {
      return await this.verifyUser(authHeaders[1]);
    } else {
      ErrorHelper.UnauthorizedException('Unauthorized');
    }
  }

}
