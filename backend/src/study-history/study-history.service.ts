import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StudyHistoryQueryDto } from './dto/study-history-query.dto';
import { PaginationUtil } from '../common/utils/pagination.util';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';

@Injectable()
export class StudyHistoryService {

  constructor(private readonly prisma: PrismaService) { }

  async findAll(userId: string, query: StudyHistoryQueryDto): Promise<PaginatedResult<any>> {
    const {
      certificationId,
      subjectId,
      from,
      to,
      page,
      limit
    } = query;

    const where = {
      deletedAt: null,

      enrollment: {
        userId,
        deletedAt: null,

        ...(certificationId && {
          certificationId
        })
      },

      ...(subjectId && {
        certificationSubject: {
          subjectId
        }
      }),

      ...(from || to) && {
        startedAt: {
          ...(from && {
            gte: new Date(from)
          }),

          ...(to && {
            lte: new Date(to)
          })
        }
      }
    };

    const skip = PaginationUtil.getSkip(page, limit);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.studySession.findMany({
        where,
        skip,
        take: limit,
        include: {
          certificationSubject: {
            include: {
              subject: true,
              certification: true
            }
          },

          enrollment: {
            include: {
              certification: true
            }
          }
        },

        orderBy: {
          startedAt: 'desc'
        }
      }),

      this.prisma.studySession.count({
        where
      })
    ]);

    return PaginationUtil.buildResult(
      data.map((session) => ({
        id: session.id,
        startedAt: session.startedAt,
        endedAt: session.endedAt,
        studyType: session.studyType,
        mood: session.mood,
        notes: session.notes,
        createdAt: session.createdAt,
        certification: session.certificationSubject.certification,
        subject: session.certificationSubject.subject
      })),
      page,
      limit,
      total
    );
  }
  
}