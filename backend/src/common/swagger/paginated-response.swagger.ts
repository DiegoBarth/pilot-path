import { Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../dto/paginated-response.dto';

export function ApiPaginatedResponse<TModel extends Type<any>>(model: TModel) {
  return (target: object, key: string | symbol, descriptor: PropertyDescriptor) => {
    ApiExtraModels(PaginatedResponseDto, model)(
      target,
      key,
      descriptor,
    );

    ApiOkResponse({
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(PaginatedResponseDto)
          },
          {
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: getSchemaPath(model)
                }
              }
            }
          }
        ]
      }
    })(
      target,
      key,
      descriptor
    );
  };
}