import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  
  constructor (@InjectRepository(UserEntity) userRepository: Repository <UserEntity>,) {}
   async showAll(): Promise<UserResponseObject[]> {
    const users= await this.userRepository.finf();
    return users.map(user=>user.toResponseObject(false));
  }
  async login(data: UserDTO):  Promise<UserResponseObject[]> {
    const{ username, password}= data;
    const user=await this.userRepository.findOne({where: {username}})
    if(!user||!(await user.comparePassword(password))) {
      throw new HttpException(
        'invalide/username/Password',
        HttpStatus.BAD_REQUEST,
      )
    }
    return user.toResponseObject();
  }
  async  register(data: UserDTO): Promise<UserResponseObject[]> {
    const {username}= data;
    let user= await this.userRepository.findOne({where: {username}});
    if(user){
      throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
    }
    user= await this.userRepository.save(user);
    return user.toResponseObject(;)
  }   
}

