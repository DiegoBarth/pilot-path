import { PaginationMetaDto } from '../dto/pagination-meta.dto';
import { PaginatedResult } from '../interfaces/paginated-result.interface';

export class PaginationUtil {

  static getSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  static buildMeta(page: number, limit: number, total: number): PaginationMetaDto {
    return {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };
  }

  static buildResult<T>(data: T[], page: number, limit: number, total: number): PaginatedResult<T> {
    return {
      data,
      meta: this.buildMeta(
        page,
        limit,
        total
      )
    };
  }

}