import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { SignupValidation } from './validation/auth.validation';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(request: SignupValidation) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: request.email },
    });
    if (userExists) {
      throw new BadRequestException({
        status: 400,
        message: 'Email already exists, please signin',
        error: 'Email Conflict',
      });
    }
    const hash = await argon.hash(request.password);
    const user = await this.prisma.user.create({
      data: {
        email: request.email,
        hash,
        first_name: request.first_name,
        last_name: request.last_name,
      },
      select: {
        id: true,
        email: true,
        created_at: true,
      },
    });
    return user;
  }

  async login() {
    return 'Logged in';
  }

  async signToken(
    id: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: id,
      email: email,
    };
  }
}
