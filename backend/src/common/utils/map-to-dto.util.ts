import { ClassConstructor, plainToInstance } from 'class-transformer';

export function mapToDto<T>(
  dtoClass: ClassConstructor<T>,
  data: unknown,
): T {
  return plainToInstance(dtoClass, data, {
    excludeExtraneousValues: true,
  });
}

export function mapToDtoArray<T>(
  dtoClass: ClassConstructor<T>,
  data: unknown[],
): T[] {
  return data.map((item) => mapToDto(dtoClass, item));
}
