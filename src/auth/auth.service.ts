import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async validateUser(login: string, pass: string) {
    const result = await this.userService.getUserByLogin(login);
    if (!(await bcrypt.compare(pass, result.password))) {
      throw new ForbiddenException('Wrong password');
    }
    return result;
  }

  async login(user) {
    const result = await this.validateUser(user.login, user.password);
    const payload = {
      login: result.login,
      userId: result.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(
      createUserDto.password,
      +process.env.CRYPT_SALT,
    );
    return this.userService.createUser({
      login: createUserDto.login,
      password: String(passwordHash),
    });
  }

  async refresh(user) {
    const result = await this.validateUser(user.login, user.password);
    const payload = {
      login: result.login,
      userId: result.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
