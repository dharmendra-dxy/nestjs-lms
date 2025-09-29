import bcrpyt from "bcrypt";

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dto/registerUser.dto';

@Injectable()
export class AuthService {

    // receive from userService:
    constructor(private readonly userService:UserService){}

    async registerUser(registerUserDTO: RegisterUserDTO){


        // hash the password:
        const salt = 10;
        const hassPassword = await bcrpyt.hash(registerUserDTO.password, salt)


        /*
         * Logic for register user:
         * 1. check if user email already exsists
         * 2. hash the password
         * 3. store the user in db
         * 4. generate the jwt token
        */

        return this.userService.createUser({...registerUserDTO, password: hassPassword});
    }

    loginUser(){
        return {
            success: true,
            message: "User logged-in successfully",
        }
    }


}
