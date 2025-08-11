import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(email: string, name: string, password: string) {
    const exists = await this.userModel.findOne({ email });
    if (exists) throw new BadRequestException('User already exists');
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ email, name, password: hashed });
    const obj = user.toObject() as Omit<User, 'password'> & { password?: string };
    delete obj.password;
    return obj;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    const obj: Omit<User, 'password'> & { password?: string } = user.toObject();
    delete obj.password;
    return obj;
  }

  async findUserById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    return user;
  }
}
