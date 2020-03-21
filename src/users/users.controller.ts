import { controller, Post, Get, Body, UsePipes} from '@nestjs/common';
import { get } from 'http';

@controller('User')
export class UserController{
    constructor (private userservice:userservice) {}

@Get('api/Users')

 showAllUsers(){
    return this.userservice.showAll();
 }

 @Post('login')
  @UsePipes(new ValidaationPipe())
 login(@Body() data: UserDTO){
    return this.userservice.login(data);
 }   

 @Post('register')
 register(@Body() data: UserDTO ){
   return this.userservice.register(data);
 }
}