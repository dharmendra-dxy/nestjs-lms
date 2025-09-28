import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    registerUser(){

        /*
         * Logic for register user:
         * 1. check if user email already exsists
         * 2. hash the password
         * 3. store the user in db
         * 4. generate the jwt token
        */


        return {
            success: true,
            message: "User registered successfully",
        }
    }

    loginUser(){
        return {
            success: true,
            message: "User logged-in successfully",
        }
    }


}
