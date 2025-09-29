import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDTO } from 'src/auth/dto/registerUser.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    // mongoose:
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async createUser(registerUserDTO: RegisterUserDTO){

        try{
            const newUser = await this.userModel.create({
                first_name: registerUserDTO.first_name,
                last_name: registerUserDTO.last_name,
                email: registerUserDTO.email,
                password: registerUserDTO.password,
            })

            // Fetch user again without the password
            const safeUser = await this.userModel.findById(newUser._id).select("-password");

            return {
                success: true,
                message: "User created Successfully",
                data: safeUser
            }
        }
        catch(err){

            const DUPLICATE_KEY_CODE=11000;

            if(err?.code===DUPLICATE_KEY_CODE){
                throw new ConflictException("Email is already taken")
            }

            throw err;

            // return {
            //     success: false,
            //     message: "Error while creating user"
            // }
        }

        
    }

}
