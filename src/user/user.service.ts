import { Injectable } from '@nestjs/common';
import { RegisterUserDTO } from 'src/auth/dto/registerUser.dto';

@Injectable()
export class UserService {

    createUser(registerUserDTO: RegisterUserDTO){
        console.log("rs: ", registerUserDTO);

        // connect with database

        return {
            success: true,
            message: "User created Successfully"
        }
    }

}
