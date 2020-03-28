import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export class CreateUserDto {
 // fullName
 @ApiModelProperty({
    example: 'houssem HAMED',
    description: 'The name of the User',
    format: 'string',
    minLength: 3,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  readonly fullName: string;

  // Email
  @ApiModelProperty({
    example: 'houssem@gmail.com',
    description: 'The email of the User',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  // Password
  @ApiModelProperty({
    example: 'secretpassword!',
    description: 'The password of the User',
    format: 'string',
    minLength: 5,
    maxLength: 1024,
  })
  @ApiModelProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password: string;
}