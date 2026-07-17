import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { FlashcardsSwagger } from './flashcards.swagger';
import { Auth } from '../auth/decorators/auth.decorator';
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
  @Get()
  @FlashcardsSwagger.findAll
  findAll() {
    return this.flashcardsService.findAll();
  }

  @Auth()
  @Get(':id')
  @FlashcardsSwagger.findOne
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.flashcardsService.findOne(id);
  }

}