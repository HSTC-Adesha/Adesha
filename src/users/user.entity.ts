import {Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, Any} from "typeorm";
import *as bcrypt from "bcryptjs";
import *as jwt from "jsonwebtoken";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn ('vvid')
     id:string;
    @CreateDateColumn()
    created:Date;

    @Column({
        type:'text',
        unique: true
    })
    username:string;
    
    @Column('text')
    password: string;

    @BeforeInsert()
    async hashpassword(){
        this.password= await bcrypt.hash(this.password, 15);
    }
    toResponseObject(showToken: boolean= true): UserResponseObject{
        const {id, created, username, token}=this;
        const responseObject= Any {id, created, username};
        if(showToken){
            responseObject.token= token;
        }
        return responseObject;
    }

async comparePassword(attempt: string){
    return await bcrypt.compare(attempt, this.password);
}

private get token (){
    const {id, username}= this;
    return jwt.sign(
        {

        }
    )
}
}
