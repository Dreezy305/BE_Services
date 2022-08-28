import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { jwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(jwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  // get all users
  @Get()
  getUsers() {
    return this.userService.getAllUsers();
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

  @Patch('editUser/:id')
  editUser(@GetUser('id') id: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(id, dto);
  }
}

// 2:18:55 (guards)
