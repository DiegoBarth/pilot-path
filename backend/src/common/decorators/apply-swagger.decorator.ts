import {
  applyDecorators,
} from '@nestjs/common';

export function ApplySwagger(
  decorator: MethodDecorator,
) {
  return applyDecorators(decorator);
}