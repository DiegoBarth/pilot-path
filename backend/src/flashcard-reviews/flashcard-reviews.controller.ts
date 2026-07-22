import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Auth } from '../auth/decorators/auth.decorator';
import { AuthUser } from '../auth/decorators/auth-user.decorator';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';
import { FlashcardReviewsService } from './flashcard-reviews.service';
import { CreateFlashcardReviewDto } from './dto/create-flashcard-review.dto';
import { FlashcardReviewsSwagger } from './flashcard-reviews.swagger';

@Auth()
@Controller('flashcards')
export class FlashcardReviewsController {
  constructor(private readonly service: FlashcardReviewsService) {}

  @Get('reviews')
  @FlashcardReviewsSwagger.findReviews
  findReviews(@AuthUser() user: AuthenticatedUser) {
    return this.service.findReviews(user.id);
  }

  @Post(':id/review')
  @FlashcardReviewsSwagger.review
  review(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateFlashcardReviewDto,
    @AuthUser() user: AuthenticatedUser,
  ) {
    return this.service.review(user.id, id, dto);
  }
}
