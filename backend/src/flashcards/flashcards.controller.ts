import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { FlashcardQueryDto } from './dto/flashcard-query.dto';
import { FlashcardsSwagger } from './flashcards.swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { UserRole } from '@prisma/client';

@Controller('flashcards')
export class FlashcardsController {

  constructor(private readonly flashcardsService: FlashcardsService) { }

  @Auth(UserRole.ADMIN)
  @Post()
  @FlashcardsSwagger.create
  create(@Body() dto: CreateFlashcardDto) {
    return this.flashcardsService.create(dto);
  }

  @Auth()
  @Get('overview')
  @FlashcardsSwagger.overview
  getOverview(@AuthUser() user: { id: string }, @Query() query: FlashcardQueryDto) {
    return this.flashcardsService.getOverview(user.id, query);
  }

  @Auth()
  @Get('review-queue')
  @FlashcardsSwagger.reviewQueue
  getReviewQueue(@AuthUser() user: { id: string }, @Query() query: FlashcardQueryDto) {
    return this.flashcardsService.getReviewQueue(user.id, query);
  }

  @Auth()
  @Get()
  @FlashcardsSwagger.findAll
  findAll(@AuthUser() user: { id: string }, @Query() query: FlashcardQueryDto) {
    return this.flashcardsService.findAll(user.id, query);
  }

  @Auth()
  @Get(':id')
  @FlashcardsSwagger.findOne
  findOne(@Param('id', ParseUUIDPipe) id: string, @AuthUser() user: { id: string }) {
    return this.flashcardsService.findOne(id, user.id);
  }

}
