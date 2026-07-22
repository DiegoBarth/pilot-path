import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Expose } from 'class-transformer';

export class AuthUserResponseDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  id!: string;

  @Expose()
  @ApiProperty()
  name!: string;

  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiProperty({ enum: UserRole })
  role!: UserRole;
}

export class AuthTokenResponseDto {
  @ApiProperty()
  access_token!: string;

  @ApiProperty({ type: AuthUserResponseDto })
  user!: AuthUserResponseDto;
}
