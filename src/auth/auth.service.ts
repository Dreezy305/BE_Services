import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // connect to mongo
    await this.prisma.$connect();
    //  generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      //  save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });

      //  return the saved user
      return {
        success: true,
        data: user,
        message: 'account created successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw new error();
    }
  }

  async signin(dto: AuthDto) {
    await this.prisma.$connect();
    // find the user by email
    const user = this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('credentials incorrect');
    }

    // compare password
    const pwdMatch = argon.verify((await user).hash, dto.password);

    // if password incorrect, throw exception
    if (!pwdMatch) {
      throw new ForbiddenException('credentials incorrect');
    }

    return {
      success: true,
      data: user,
      message: 'account created successfully',
    };
  }
}
