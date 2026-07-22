import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../database/prisma.service';
import { mapToDto } from '../common/utils/map-to-dto.util';
import { AuthUserResponseDto } from './dto/auth-response.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface RefreshJwtPayload {
  sub: string;
  type: 'refresh';
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });

    return this.createAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.createAuthResponse(user);
  }

  async refresh(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify<RefreshJwtPayload>(dto.refresh_token);

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const user = await this.prisma.user.findFirst({
        where: {
          id: payload.sub,
          deletedAt: null,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.createAuthResponse(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private createAuthResponse(user: User) {
    const access_token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refresh_token = this.jwtService.sign(
      {
        sub: user.id,
        type: 'refresh',
      },
      {
        expiresIn: this.config.getOrThrow('auth.refreshExpiresIn'),
      },
    );

    return {
      access_token,
      refresh_token,
      user: mapToDto(AuthUserResponseDto, this.removePassword(user)),
    };
  }

  private removePassword(user: User) {
    const { password: _password, ...result } = user;
    return result;
  }
}
