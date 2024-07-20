import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signUp(signUpDto: SignUpDto): Object {
    const saltOrRounds = 10;
    const salt = bcrypt.genSaltSync(saltOrRounds);
    const hashedPassword = bcrypt.hashSync(signUpDto.password, salt);

    this.usersService.create(
      signUpDto.username,
      hashedPassword,
      signUpDto.email,
    );

    return {
      message: 'Successfully register',
      statusCode: HttpStatus.CREATED,
    };
  }

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    //JWT implementation
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
