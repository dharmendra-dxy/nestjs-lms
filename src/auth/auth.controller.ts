import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/registerUser.dto';

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
    registerUser(@Body() registerUserDTO: RegisterUserDTO){

        const result = this.authService.registerUser(registerUserDTO);
        return result;
    }


    @Post("login")
    loginUser(){
        return this.authService.loginUser();
    }

}
