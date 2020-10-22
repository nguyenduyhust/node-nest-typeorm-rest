import { Controller, Get, Post, Body, Patch, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { classToPlain } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

import { UserService } from '@api/services/user.service';
import { UserDTO, CreateUserDTO, UpdateUserDTO } from '@api/dtos';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  @ApiResponse({
    status: 200,
  })
  @ApiQuery({ name: 's', required: false, type: 'string' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({ name: 'limit', required: false, type: 'number' })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
    @Query('s') s = '',
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.userService.findAll(
      {
        page,
        limit,
        route: `${this.configService.get('app.apiUrl')}/admin/users`,
      },
      s,
    );
  }

  @Post()
  async create(@Body() payload: CreateUserDTO) {
    return classToPlain(await this.userService.create(payload));
  }
}
