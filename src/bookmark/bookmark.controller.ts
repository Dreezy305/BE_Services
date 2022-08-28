import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { jwtGuard } from '../auth/guard';

@UseGuards(jwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  @Get()
  getBookmarks() {}

  @Get('bookmark/:id')
  getBookmarkById() {}

  @Patch('bookmark/:id')
  editBookmarkById() {}
}
