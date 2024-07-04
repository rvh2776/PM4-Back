import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../users/dtos/UpdateUserDto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: UpdateUserDto) {
    const dbUser = await this.usersService.findByEmail(user.email);

    if (dbUser) {
      throw new BadRequestException(
        `El email: ${dbUser.email} ya existe en el sistema`,
      );
    }

    if (!user.password || !user.rePassword) {
      throw new BadRequestException(
        'El password y su confirmación son obligatorios',
      );
    }

    if (user.password !== user.rePassword) {
      throw new BadRequestException('Confirmación de password incorrecta');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword) {
      throw new BadRequestException('El password no se pudo encriptar');
    }

    await this.usersService.createUser({ ...user, password: hashedPassword });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, rePassword, ...userOut } = user;

    return userOut;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Email o password incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };

    const token = this.jwtService.sign(userPayload);

    const decodedToken = this.jwtService.decode(token);

    // console.log(decodedToken);

    const iat = new Date(decodedToken.iat * 1000).toLocaleString();
    const exp = new Date(decodedToken.exp * 1000).toLocaleString();

    return {
      success: `User logged in successfully`,
      token,
      issuedAt: iat,
      expiresAt: exp,
    };
  }
}
