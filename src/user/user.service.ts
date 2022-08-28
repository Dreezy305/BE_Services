import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const user = await this.prisma.user.findMany();
    return { success: true, data: user, message: 'Users fetched successfully' };
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: { ...dto },
    });

    delete user.hash;

    return user;
  }
}
