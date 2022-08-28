import { Injectable } from '@nestjs/common';

@Injectable()
export class BookmarkService {
  createBookmark() {
    console.log('create bookmark');
  }

  getBookmarks() {
    console.log('bookmarks');
  }

  getBookmarkById() {
    console.log('bookmarks  by id');
  }

  editBookmarkById() {
    console.log('edit bookmarks by id');
  }

  deleteBookmarkById() {
    console.log('delete bookmarks by id');
  }
}
