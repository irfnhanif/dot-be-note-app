import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { createUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: createUserDto): Promise<User> {
    const saltOrRounds = 10
    const salt = bcrypt.genSaltSync(saltOrRounds)
    const hashedPassword = bcrypt.hashSync(createUserDto.password, salt)

    return this.userModel.create({
      username: createUserDto.username,
      password: hashedPassword,
      email: createUserDto.email,
    });
  }

  findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { username: username } });
  }
}
