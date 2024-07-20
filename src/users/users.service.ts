import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(username: string, password: string, email: string): Promise<User> {
    return this.userModel.create({
      username: username,
      password: password,
      email: email,
    });
  }

  findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { username: username } });
  }
}
