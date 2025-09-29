import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constant';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
      UserModule,
      ConfigModule.forRoot(),
      JwtModule.register({
        global: true,
        secret: jwtConstant.secret,
        signOptions: { expiresIn: '60s' },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}