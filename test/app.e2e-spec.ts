import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AuthDto, LoginDto } from 'src/auth/dto';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);
    pactum.request.setBaseUrl('http://localhost:3333');
    prisma = app.get(PrismaService);
    await prisma.$connect();
  });

  afterAll(() => {
    app.close();
  });
  it.todo('should pass');

  describe('Auth', () => {
    describe('Signup', () => {
      const dto: AuthDto = {
        email: 'idris.bankole+11@gmail.com',
        password: 'password',
        firstName: 'idris',
        lastName: 'bankole',
      };

      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no dto/body is empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({})
          .expectStatus(400);
      });

      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      const dto: LoginDto = {
        email: 'idris.bankole+5@gmail.com',
        password: 'password',
      };

      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no dto/body is empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({})
          .expectStatus(400);
      });

      it('should sign in', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAccessToken', 'accessToken');
      });
    });
  });

  describe('User', () => {
    // describe('Get me', () => {
    //   it('should get user by id', () => {
    //     return pactum
    //       .spec()
    //       .get('users/singleUser/:id')
    //       .withHeaders({ Authorization: 'Bearer $S{userAccessToken}' })
    //       .expectStatus(200)
    //       .inspect();
    //   });
    // });

    describe('Edit user', () => {});
  });

  describe('Bookmarks', () => {
    describe('Create bookmarks', () => {});

    describe('Get boookmarks', () => {});

    describe('Get boookmark by id', () => {});

    describe('Edit boookmark by id', () => {});

    describe('Delete boookmark by id', () => {});
  });
});

// 3:05:08
