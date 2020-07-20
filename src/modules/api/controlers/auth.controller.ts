import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDTO, AuthValidateDTO, AuthRefreshTokenDTO } from '@api/dtos';
import { AuthService } from '@api/services';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) { }
  // Create a new jwt token
  @ApiResponse({
    status: 200,
    isArray: false,
    type: AuthResponseDTO,
  })
  @Post('validate')
  async validate(@Body() payload: AuthValidateDTO) {
    return this.authService.login(payload.email, payload.password);
  }

  @ApiResponse({
    description: 'Refreshing Access Tokens',
    status: 200,
    isArray: false,
    type: AuthResponseDTO,
  })
  @Post('token')
  async token(@Body() payload: AuthRefreshTokenDTO) {
    return this.authService.verifyRefreshToken(payload.refresh_token);
  }

}
