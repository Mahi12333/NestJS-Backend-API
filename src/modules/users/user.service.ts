import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from './schema/user.schema';
import { UserRegistrationDto } from './dto/user-registration.dto';
console.log(User.name);
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async userRegistration(userRegistrationDto: UserRegistrationDto): Promise<any> {
    const { name, email, password, password_confirmation, tc } = userRegistrationDto;
   // console.log(name)
     // Check if all required fields are provided
     if (!name || !email || !password || !password_confirmation || tc === undefined) {
        throw new BadRequestException('All fields are requireds');
      }
    
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      if (existingUser.is_verified) {
        throw new BadRequestException('Email already exists');
      }
    }


    // Check if passwords match
    if (password !== password_confirmation) {
      throw new BadRequestException('Password and Confirm Password do not match');
    }

    try {
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
     //console.log(salt,hashedPassword)
      // Create new user
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
        tc,
        is_verified: true,
      });

      const savedUser = await newUser.save();
    // console.log(process.env.JWT_SECRET_KEY);
      // Generate JWT Token
      const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5d',
      });
      //console.log(token)
      // Return success response
      return {
        message: 'Registration successful',
        token,
      };
    } catch (error) {
      throw new BadRequestException('Unable to Register');
    }
  }

  async userLogin(userRegistrationDto: UserRegistrationDto): Promise<any> {
    const { email, password} = userRegistrationDto;
   // console.log(name)
     // Check if all required fields are provided
     if (!email || !password) {
        throw new BadRequestException('All fields are required');
      }
    
    // Check if user already exists
    const User = await this.userModel.findOne({ email });
    // console.log(User)
    if (!User) {
      throw new BadRequestException('Please do registration first');
    }
    
    const matchPass = await bcrypt.compare(password, User.password);
    if(!matchPass){
      throw new BadRequestException('Password not match');
    }

    try {
      // Hash the password
      
      const token = jwt.sign({ userID: User._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '5d',
      });
      //console.log(token)
      // Return success response
      return {
        message: 'Login successful',
        token,
      };
    } catch (error) {
      throw new BadRequestException('Unable to Login');
    }
  }
}
