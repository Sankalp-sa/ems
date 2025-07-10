import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreatUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
 
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async registerUser(createUserDto: CreatUserDto) {
        console.log("Registering user with data:", createUserDto);
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async findUserByUsername(username: string) {
        return await this.userModel.findOne({ username }).populate('manager');
    }

    async findManagers() {
        return await this.userModel.find({ role: 'manager' });
    }
    
}
