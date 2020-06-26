import { Injectable, BadRequestException, NotFoundException, ConflictException, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './interfaces/user.interface';
import { UserManagementService } from '../shared/userManagement/usermanagement.service';
import { logger } from '../shared/logger/adeshaLogger.service';

@Injectable()
export class UserService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @Inject(forwardRef(() => UserManagementService)) private readonly userManagement: UserManagementService,
    ) { }
    public async findUserByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email, verified: true});
        if (!user) {
            throw new NotFoundException('Wrong email or password.');
        }
        return user;
    }
    async getAllUsers(req) {
        const users = await this.userModel.find({verified: true}).populate({path: 'projects'}).exec();
        return users.map((usr) => ({
            id: usr.id,
            login: usr.fullName,
            mail: usr.email,
        }));

    }
    async getUserById(userId: string) {
        const p = await this.findUser(userId);
        return { id: p.id, login: p.fullName, mail: p.email};

    }
    async getUserByName(userLogin: string) {
        const p = await this.findByElement('login', userLogin);
        return p;
    }
    getUserByMail(userMail: string) {
        const p = this.findByElement('mail', userMail);
        return p;
    }
    async updateUser(usrId: string, userLogin: string, userMail: string, userPwd: string) {
        const updatedUser = await this.findUser(usrId);
        if (userLogin) {
            updatedUser.fullName = userLogin;
        }
        if (userMail) {
            updatedUser.email = userMail;
        }
        if (userPwd) {
            updatedUser.password = userPwd;
        }

        const result = await updatedUser.save();

        return { id: result.id };
    }
    public async findUser(searchValue: string): Promise<User> {
        let p;
        try {
            p = await this.userModel.findById(searchValue)
            .populate({path : 'projects', select : ['_id', 'title', 'description', 'type', 'projectisPublic']}).exec();
        } catch (error) {
            throw new NotFoundException('Could not find the user');
        }
        if (!p) {
            throw new NotFoundException('Could not find the user');
        }
        return p;
    }
    private async findByElement(elem: string, searchValue: string): Promise<User> {
        let p;
        const queryParam = {verified: true};
        queryParam[elem] = searchValue;
        try {
            p = await this.userModel.findOne(queryParam).exec();
        } catch (error) {
            throw new NotFoundException('Could not find the user');
        }
        if (!p) {
            throw new NotFoundException('Could not find the user');
        }
        return p;
    }

}
