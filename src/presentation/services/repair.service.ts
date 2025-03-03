import { Code } from "typeorm";
import { Repair , repairStatus } from "../../data";
import { UserService } from "../services/user.service";
import {  CustomError, CreateRepairDTO    } from "../../domain";

export class RepairService {
  constructor(private readonly userService: UserService) {}

  async findAllRepairServ() {
 
    try {
      return await Repair.find({
        where: {           
          status:repairStatus.PENDING
        },
      });
    } catch (error: any) {
      throw CustomError.internalServer("Error geting data from repairs");
    }
  }

  async findOneRepairServ(id: string){ 

    const repair = await Repair.findOne({
        where: {
          id ,
          status:repairStatus.PENDING
        },
      });
  
      if (!repair) {
        
        throw CustomError.notFoud("A pending Repair not found");
      }
  
      return repair; 
  }

  async deleteRepairServ (id: string){
 
    const repair = await this.findOneRepairServ(id); 

    repair.status = repairStatus.CANCELLED;

    try {
      await repair.save();
      return { message:"Repair record  deleted successfully with status cancelled" };
    } catch (error) {
      throw CustomError.internalServer("Error deleting user");
    }    
  }

  async createRepairServ (repairData: CreateRepairDTO){

    const resUserID = await this.verifyUserID(repairData.userId)
    if (!resUserID)
        throw CustomError.notFoud("User ID not found");

    const repair = new Repair()

    repair.date = repairData.date;
    repair.userId = repairData.userId
    try {
        return await repair.save();
      } catch (error:any) {
        console.log("err: ",error)
        console.log("err: ",error.code)

        throw CustomError.internalServer("Error creating repair");
      }
  }

  async updateRepairServ (id: string ){
    const repair = await this.findOneRepairServ(id); 
  
    repair.status = repairStatus.COMPLETED;

    try {
        return await repair.save();
      } catch (error: any) {
       
        throw CustomError.internalServer("Error updating repair");
      }
  }  

  async verifyUserID(id: string){
    const user = await  this.userService.findOneUserServ(id);
    console.log("res: ",user)

    return user
        
  }
}