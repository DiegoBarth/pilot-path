import {
  applyDecorators,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';


export const AuthSwagger = {

  register: applyDecorators(
    ApiTags('Authentication'),

    ApiOperation({
      summary: 'Register a new user',
    }),

    ApiBody({type: RegisterDto}),

    ApiResponse({
      status: 201,
      description: 'User successfully registered',
    }),

    ApiResponse({
      status: 409,
      description: 'Email already registered',
    }),
  ),


  login: applyDecorators(
    ApiTags('Authentication'),

    ApiOperation({
      summary: 'Authenticate user',
    }),

    ApiBody({type: LoginDto}),

    ApiResponse({
      status: 200,
      description: 'Returns JWT token',
    }),

    ApiResponse({
      status: 401,
      description: 'Invalid credentials',
    }),
  ),


  me: applyDecorators(
    ApiTags('Authentication'),

    ApiOperation({
      summary: 'Get authenticated user',
    }),

    ApiBearerAuth('JWT-auth'),

    ApiResponse({
      status: 200,
      description: 'Authenticated user',
    }),

    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
  ),

};