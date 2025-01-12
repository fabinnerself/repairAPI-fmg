import { emit } from "process";
import { User, UserStatus } from "../../data";
import {  CustomError,  CreateUserDTO, UpdateUserDTO } from "../../domain";

export class UserService {
  constructor() {}

  async findAllUserServ() {
    try {
      return await User.find();
    } catch (error) {
      throw CustomError.internalServer("Error getting data from user");
    }
  }

  async findOneUserServ(id: string) {
    const dbUser = await User.findOne({
      where: {
        id 
      },
    });

    if (!dbUser) {
      throw CustomError.notFoud("User not found");
    }

    return  dbUser;
  }

  async createUser(userData: CreateUserDTO) {
    const user = new User();

    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    try {      
      const dbUser = await user.save();

      return {
        id: dbUser.id,
        name: dbUser.name,        
        email: dbUser.email,        
        role:dbUser.role,
        status:dbUser.status
      };

    } catch (error:any) {
      if (error.code === "23505") {
        throw CustomError.badRequest(
          `Please use a different email address as ${userData.email} is already in use`
        );
      }
      throw CustomError.internalServer("Error creating user");
    }
  }

  async updateUserServ(id: string, userData: UpdateUserDTO) {
    const user = await this.findOneUserServ(id);

    user.name = userData.name.toLowerCase().trim();
    user.email = userData.email.trim();

    try {
      const dbUser = await user.save();

      return {
        id: dbUser.id,
        name: dbUser.name,        
        email: dbUser.email,        
        role:dbUser.role,
        status:dbUser.status
      };

    } catch (error:any) {
      console.log("error",error)
      console.log("error",error.code)

      if (error.code === "23505") {
        throw CustomError.badRequest(
          `Please use a different email address as ${userData.email} is already in use`
        );
      }      
      throw CustomError.internalServer("Error updating user ");
    }
  }

  async deleteUserServ(id: string) {
    const user = await this.findOneUserServ(id);  

    user.status = UserStatus.DISABLED;

    try {
      const dbUser = await user.save();
      //console.log("res ",dbUser)
      if(dbUser){
        return { id:dbUser.id,
          name: dbUser.name,        
          email: dbUser.email,        
          role:dbUser.role,
          status:dbUser.status,
          message:"User record  deleted successfully with status disabled" 
        };
      }
      else
        throw CustomError.internalServer("Error deleting user");
    } catch (error) {
      throw CustomError.internalServer("Error deleting user");
    }
  }

   
}
