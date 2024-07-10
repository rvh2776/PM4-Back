import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { DateAdderInterceptor } from '../../interceptors/date-adder.interceptor';
import { Request } from 'express';
import { UpdateUserDto } from '../users/dtos/UpdateUserDto';
import { UserCredentialsDto } from './dtos/UserCredentials.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../users/dtos/UserDto';
import { SignInApiDto } from './dtos/SignInApiDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserDto,
  })
  @Post('signup')
  @UseInterceptors(DateAdderInterceptor)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  createUser(
    @Body() user: UpdateUserDto,
    @Req() request: Request & { now: string },
  ) {
    return this.authService.signUp({ ...user, createdAt: request.now });
  }

  @ApiOperation({ summary: 'Signin' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully login.',
    type: SignInApiDto,
  })
  @Post('signin')
  @HttpCode(200)
  async loginUser(@Body() signIn: UserCredentialsDto) {
    return this.authService.validateUser(signIn.email, signIn.password);
  }
}
