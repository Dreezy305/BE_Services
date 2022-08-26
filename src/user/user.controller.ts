import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { jwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(jwtGuard)
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}

// 2:05:08 (guards)
