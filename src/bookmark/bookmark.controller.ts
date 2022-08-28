import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { jwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';

@UseGuards(jwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(@GetUser('id') userId: string) {
    console.log('create bookmarks by id');
  }

  @Get()
  getBookmarks() {
    console.log('bookmarks');
  }

  @Get('bookmark/:id')
  getBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    console.log('bookmarks  by id');
  }

  @Patch('bookmark/:id')
  editBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    console.log('edit bookmarks by id');
  }

  @Delete('bookmark/:id')
  deleteBookmarkById(
    @GetUser('id') userId: string,
    @Param('id') bookmarkId: string,
  ) {
    console.log('delete bookmarks by id');
  }
}
