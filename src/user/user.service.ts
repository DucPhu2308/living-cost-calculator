import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) { }
    async register(registerDto: RegisterDto) {
        // check unique for email and username
        const emailExist = await this.userModel.findOne({ email: registerDto.email });
        if (emailExist) {
            throw new Error('Email already exists');
        }

        const usernameExist = await this.userModel.findOne({ username: registerDto.username });
        if (usernameExist) {
            throw new Error('Username already exists');
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(registerDto.password, salt);

        const user = new this.userModel({
            email: registerDto.email,
            password: hashedPassword,
            username: registerDto.username
        });

        return user.save();
    }

    async login(loginDto: LoginDto) {
        const usernameOrEmail = loginDto.usernameOrEmail;
        const password = loginDto.password;

        const user = await this.userModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordMatch = bcrypt.compareSync(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { email: user.email, username: user.username, sub: user._id };
        const accessToken = this.jwtService.sign(payload);

        return { token: accessToken };
    }
}
