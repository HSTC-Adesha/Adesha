import { Roles } from './../auth/decorators/roles.decorator';
import { Request } from 'express';
import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiCreatedResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiConflictResponse,
    ApiUnauthorizedResponse,
    ApiOkResponse,
    ApiForbiddenResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { logger } from 'src/shared/logger/adeshaLogger.service';

@ApiUseTags('User')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }
    @UseGuards(AuthGuard('jwt'))
    @Roles('user', 'admin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Data recieved' })
    @ApiUnauthorizedResponse({ description: 'Not authorized.' })
    @ApiForbiddenResponse({ description: 'User has not permitted to this api.' })
    @Get()
    async getAllUsers(@Req() req: Request) {
        const users = await this.userService.getAllUsers(req);
        return users;
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('user', 'admin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Data recieved' })
    @ApiUnauthorizedResponse({ description: 'Not authorized.' })
    @ApiForbiddenResponse({ description: 'User has not permitted to this api.' })
    @Get(':id')
    async getUser(@Param('id') userId: string) {
        return await this.userService.getUserById(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('user', 'admin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Data recieved' })
    @ApiUnauthorizedResponse({ description: 'Not authorized.' })
    @ApiForbiddenResponse({ description: 'User has not permitted to this api.' })
    @Get('login/:name')
    async getTheUser(@Param('name') userName: string) {
        return this.userService.getUserByName(userName);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('user', 'admin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Data recieved' })
    @ApiUnauthorizedResponse({ description: 'Not authorized.' })
    @ApiForbiddenResponse({ description: 'User has not permitted to this api.' })
    @Get('mail/:mail')
    getByMailUser(@Param('mail') userMail: string) {
        return this.userService.getUserByMail(userMail);
    }

    @UseGuards(AuthGuard('jwt'))
    @Roles('user', 'admin')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Data recieved' })
    @ApiUnauthorizedResponse({ description: 'Not authorized.' })
    @ApiForbiddenResponse({ description: 'User has not permitted to this api.' })
    @Patch(':id')
    updateUser(
        @Param('id') userId: string,
        @Body('login') userName: string,
        @Body('mail') userMail: string,
        @Body('password') userPwd: string) {
            return this.userService.updateUser(userId, userName, userMail, userPwd);
    }

}
