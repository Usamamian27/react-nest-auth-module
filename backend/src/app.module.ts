import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoConfig } from './config/mongo.config';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule globally available
    }),
    MongoConfig, // Import MongoDB configuration
    UserModule,
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
