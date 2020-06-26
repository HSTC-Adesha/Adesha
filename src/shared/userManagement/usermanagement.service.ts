import { Injectable, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import * as jwt_decode from 'jwt-decode';
import { User } from '../../user/interfaces/user.interface';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { logger } from '../logger/adeshaLogger.service';

@Injectable()
export class UserManagementService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @Inject(forwardRef(() => UserService))  private readonly userService: UserService,
        @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
) { }
    async getTheUser(req) {
        const token = await this.authService.jwtExtractor(req);
        const decoded = jwt_decode(token);
        const theUser: User = await this.userService.findUser(decoded.userId);
        return theUser;
    }
    async iAmAMember(req, project) {
        const token = await this.authService.jwtExtractor(req);
        const decoded = jwt_decode(token);
        const theUser: User = await this.userService.findUser(decoded.userId);
        if (project.members.includes(theUser._id)) {
            return true;
        } else {
            return false;
        }
    }
    async iAmAManager(req, project) {
        const token = await this.authService.jwtExtractor(req);
        const decoded = jwt_decode(token);
        const theUser: User = await this.findMe(decoded.userId);
        if (project.members.includes(theUser._id)) {
            return true;
        } else {
            return false;
        }
    }
    private async findMe(searchValue: string): Promise<User> {
        let p;
        try {
            p = await this.userModel.findById(searchValue)
            .populate({path : 'projects', select : ['_id', 'title', 'description', 'type', 'projectisPublic']}).exec();
        } catch (error) {
            logger.error('Could not find the user');
            throw new NotFoundException('Could not find the user');
        }
        if (!p) {
            logger.error('Could not find the user');
            throw new NotFoundException('Could not find the user');
        }
        return p;
    }
}
