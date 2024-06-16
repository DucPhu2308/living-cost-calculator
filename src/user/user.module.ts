import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
            JwtModule.register({
              global: true,
              secret: 'temp_secret',
              signOptions: { expiresIn: '7d' },
            })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
