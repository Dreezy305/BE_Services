import {
  IsArray,
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  createdAt: string;

  @IsDate()
  updatedAt: string;

  @IsArray()
  bookmarks: [];
}
