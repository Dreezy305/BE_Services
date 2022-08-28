import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  async createBookmark(userId: string, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return {
      success: true,
      data: bookmark,
      message: 'Bookmark created successfully',
    };
  }

  async getAllBookmarks() {
    const bookmarks = await this.prisma.bookmark.findMany();
    return {
      success: true,
      data: bookmarks,
      message: 'All bookmarks fetched successfully',
    };
  }

  async getBookmarks(userId: string) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
    return {
      success: true,
      data: bookmarks,
      message: 'Bookmarks fetched successfully',
    };
  }

  getBookmarkById(userId: string, bookmarkId: string) {
    console.log('bookmarks  by id');
  }

  editBookmarkById(userId: string, bookmark: string, dto: EditBookmarkDto) {
    console.log('edit bookmarks by id');
  }

  deleteBookmarkById(userId: string, bookmarkId: string) {
    console.log('delete bookmarks by id');
  }
}
