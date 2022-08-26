import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { jwtGuard } from 'src/auth/guard';

@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log({ email });
    return user;
  }

  @Get('singleUser/:id')
  getSingleUser(@GetUser('id') id: string) {
    console.log(id);
    return id;
  }
}

// 2:05:08 (guards)
