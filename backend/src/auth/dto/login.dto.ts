import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty( {example: 'admin@pilotpath.com'} )
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty( {example: 'Password123!'} )
  password!: string;
}