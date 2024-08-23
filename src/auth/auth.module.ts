import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET environment variable is not defined');
        }
        return {
          secret,
          signOptions: { expiresIn: '60m' },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    JwtService,
  ],
  exports: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
