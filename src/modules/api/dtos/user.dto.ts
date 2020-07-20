import { MaxLength, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class CreateUserDTO {
  @ApiProperty()
  @MaxLength(60, { message: '60' })
  @IsNotEmpty({ message: 'required' })
  username: string;

  @ApiProperty()
  @MinLength(6, { message: '6' })
  @MaxLength(60, { message: '60' })
  @IsNotEmpty({ message: 'required' })
  password: string;

  @ApiProperty()
  @MaxLength(180, { message: '180' })
  @IsNotEmpty({ message: 'required' })
  fullName: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(15, { message: '15' })
  @IsNotEmpty({ message: 'required' })
  phone: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsOptional()
  @MaxLength(180, { message: '180' })
  @IsNotEmpty({ message: 'required' })
  fullName: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(15, { message: '15' })
  @IsNotEmpty({ message: 'required' })
  phone: string;
}
