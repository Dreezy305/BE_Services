import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mongodb+srv://dreezy305:Olamide440@cluster0.ouk91z9.mongodb.net/TEST_DB?retryWrites=true&w=majority',
        },
      },
    });
  }
}
