import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { jwtGuard } from 'src/auth/guard';

@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  @Get()
  getUsers(@GetUser() user: User) {
    return user;
  }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  // gets a sigle user wit ID
  @Get('singleUser/:id')
  getSingleUser(
    @GetUser('id') id: string,
    @GetUser('email') email: string,
    @GetUser('firstName') firstName: string,
    @GetUser('lastName') lastName: string,
  ) {
    return { id, email, firstName, lastName };
  }
}

// 2:18:55 (guards)
