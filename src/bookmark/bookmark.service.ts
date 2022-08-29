import { ForbiddenException, Injectable } from '@nestjs/common';
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
      where: { userId, id: bookmarkId },
    });
    return {
      success: true,
      data: bookmarks,
      message: 'Bookmark fetched successfully',
    };
  }

  async editBookmarkById(
    userId: string,
    bookmarkId: string,
    dto: EditBookmarkDto,
  ) {
    // get the bookmark by ID
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    const edited = await this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: { ...dto },
    });

    return {
      status: true,
      data: edited,
      message: 'Bookmark edited successfully',
    };
  }

  async deleteBookmarkById(userId: string, bookmarkId: string) {
    // get the bookmark by ID
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource denied');
    }
    const deleted = await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });

    return {
      status: true,
      data: deleted,
      message: 'Bookmark deleted successfully',
    };
  }
}

// 3:33:10
// store the id with pactum
// tests
