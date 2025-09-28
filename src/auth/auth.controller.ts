import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    // authService: AuthService;

    // constructor(authService: AuthService){
    //     this.authService = authService;
    // }

    // instead of above code, this code can be used:
    constructor(private readonly authService: AuthService){
        this.authService = authService;
    }

    @Post("register")
    registerUser(){
        const result = this.authService.registerUser();
        return result;
    }


    @Post("login")
    loginUser(){
        return this.authService.loginUser();
    }

}
