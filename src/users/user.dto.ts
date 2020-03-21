import {IsNotEmpty} from 'class-validator';

export classe UserDTO {

    @IsNotEmpty()
    username:string;

    @IsNotEmpty()
    password:string;

}
export class UserResponseObject {
    id:string;
    username: string;
    created:Date;
    token?: string;
}