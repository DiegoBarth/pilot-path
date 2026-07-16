import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthSwagger } from './auth.swagger';
import { ApplySwagger } from '../common/decorators/apply-swagger.decorator';
import { Auth } from './decorators/auth.decorator';
import { AuthUser } from './decorators/auth-user.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApplySwagger(AuthSwagger.register)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApplySwagger(AuthSwagger.login)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Auth()
  @Get('me')
  @ApplySwagger(AuthSwagger.me)
  me(@AuthUser() user: any) {
    return user;
  }

}