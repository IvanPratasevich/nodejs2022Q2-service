import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  async validateUser(login: string, pass: string) {
    return await this.userService.getUserByLoginPass(login, pass);
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
    return this.userService.createUser(createUserDto);
  }
}
