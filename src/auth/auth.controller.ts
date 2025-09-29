import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    // authService: AuthService;

    // constructor(authService: AuthService){
    //     this.authService = authService;
    // }

    // instead of above code, this code can be used:
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ){
        this.authService = authService;
    }

    @Post("register")
    async registerUser(@Body() registerUserDTO: RegisterUserDTO){

        const newUser = await this.authService.registerUser(registerUserDTO);
        return newUser;
    }


    @Post("login")
    loginUser(){
        return this.authService.loginUser();
    }


    @UseGuards(AuthGuard)
    @Get("profile")
    async getProfile(@Request() req){
        const userId = req.user.sub;

        const user = await this.userService.getUser(userId);
        return {
            success: true,
            message: "User fetched successfully",
            data: user
        }

    }   

}
