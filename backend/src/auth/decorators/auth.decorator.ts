import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Auth = (...roles: string[]) => {
  const decorators = [
    ApiBearerAuth('JWT-auth'),
    UseGuards(
      JwtAuthGuard,
      RolesGuard
    )
  ];

  if (roles.length) {
    decorators.push(
      SetMetadata('roles', roles)
    );
  }

  return applyDecorators(...decorators);
};