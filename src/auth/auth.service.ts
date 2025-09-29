import bcrpyt from "bcrypt";

import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDTO } from './dto/registerUser.dto';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    // receive from userService:
    constructor(
        private readonly userService:UserService,
        private readonly jwtService: JwtService,
    ){}

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

        const user = await this.userService.createUser({...registerUserDTO, password: hassPassword});

        const jwtPayload = {
            sub: user?.data?._id,
            email: user?.data?.email,
            role: user?.data?.role
        }
        const token = await this.jwtService.signAsync(jwtPayload);

        return {...user, access_token: token};
    }

    loginUser(){
        return {
            success: true,
            message: "User logged-in successfully",
        }
    }


}
