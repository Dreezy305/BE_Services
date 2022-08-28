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

  async getBookmarkById(userId: string, bookmarkId: string) {
    const bookmarks = await this.prisma.bookmark.findFirst({
      where: { id: bookmarkId, userId },
    });
    return {
      success: true,
      data: bookmarks,
      message: 'Bookmark fetched successfully',
    };
  }

  editBookmarkById(userId: string, bookmark: string, dto: EditBookmarkDto) {
    console.log('edit bookmarks by id');
  }

  deleteBookmarkById(userId: string, bookmarkId: string) {
    console.log('delete bookmarks by id');
  }
}

// 3:33:10
// store the id with pactum
// tests
