import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthTokenResponseDto, AuthUserResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export const AuthSwagger = {
  register: applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Register a new user' }),
    ApiBody({ type: RegisterDto }),
    ApiCreatedResponse({
      description: 'User successfully registered',
      type: AuthUserResponseDto,
    }),
    ApiConflictResponse({ description: 'Email already registered' }),
  ),

  login: applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Authenticate user' }),
    ApiBody({ type: LoginDto }),
    ApiOkResponse({
      description: 'Returns JWT token',
      type: AuthTokenResponseDto,
    }),
    ApiUnauthorizedResponse({ description: 'Invalid credentials' }),
  ),

  me: applyDecorators(
    ApiTags('Authentication'),
    ApiOperation({ summary: 'Get authenticated user' }),
    ApiBearerAuth('JWT-auth'),
    ApiOkResponse({
      description: 'Authenticated user',
      type: AuthUserResponseDto,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  ),
};
