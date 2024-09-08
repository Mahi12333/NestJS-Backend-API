import { Controller, Post, Body, BadRequestException, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { Response } from 'express';
import {ApiResponseUtil} from '../../common/utils/api-response.util';
import { ChangePasswordDto } from './dto/user-change-password.dto';

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

  @Post('change-password')
  async changeUserPassword(@Body() ChangePasswordDto: ChangePasswordDto, @Res() res: Response): Promise<any> {
    try {
      const result = await this.userService.changeUserPassword(ChangePasswordDto);
      return res.status(200).json(result); // API success response
    } catch (error) {
      return res.status(error.response?.statusCode || 500).json(ApiResponseUtil.error(error.message, error.response?.statusCode || 500));
    }
  }

  

}
