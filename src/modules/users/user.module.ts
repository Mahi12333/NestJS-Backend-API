import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schema/user.schema'; // Mongoose schema for user


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Import user schema
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export the service if other modules (like auth) need it
})
export class UserModule {}


