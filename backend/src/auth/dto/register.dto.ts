import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @ApiProperty( {example: 'Diego Barth'} )
  name!: string;

  @IsEmail()
  @ApiProperty( {example: 'diego.barth@gmail.com'} )
  email!: string;

  @IsString()
  @MinLength(8)
  @ApiProperty( {example: 'Password123!'} )
  password!: string;
}