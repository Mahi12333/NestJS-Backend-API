import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './dto/user-registration.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async userRegistration(@Body() userRegistrationDto: UserRegistrationDto) {
    try {
      return await this.userService.userRegistration(userRegistrationDto);
    } catch (error) {
       // console.log(error)
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async userLogin(@Body() userRegistrationDto: UserRegistrationDto) {
    try {
      return await this.userService.userLogin(userRegistrationDto);
    } catch (error) {
       // console.log(error)
      throw new BadRequestException(error.message);
    }
  }
}
