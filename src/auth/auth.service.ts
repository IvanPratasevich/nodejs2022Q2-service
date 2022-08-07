import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(login: string, pass: string) {
    const user = await this.userService.getUserByLogin(login);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...res } = user;
      return res;
    } else {
      return null;
    }
  }
}
