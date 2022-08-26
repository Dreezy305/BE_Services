import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

  async signin(dto: LoginDto) {
    await this.prisma.$connect();
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('credentials incorrect');
    }

    // compare password
    const pwdMatch = await argon.verify(user.hash, dto.password);

    // if password incorrect, throw exception
    if (!pwdMatch) {
      throw new ForbiddenException('credentials incorrect');
    }

    // return {
    //   success: true,
    //   data: this.signToken(user.id, user.email),
    //   message: 'account created successfully',
    // };
    return this.signToken(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.createdAt,
    );
  }

  async signToken(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
  ): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email, firstName, lastName, createdAt };

    const secret = this.configService.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { accessToken: token };
  }
}
