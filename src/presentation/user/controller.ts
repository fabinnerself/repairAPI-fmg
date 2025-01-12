import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import {  CustomError, CreateUserDTO, UpdateUserDTO } from "../../domain";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  createUser = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDTO.create(req.body);    

    if (error) return res.status(422).json({ message: error });

    this.userService
     .createUser(createUserDto!)     
      .then((data: any) => {
        return res.status(201).json(data);
      })
      .catch((error: unknown) => this.handleError(error, res));
  };

  findAllUser = (req: Request, res: Response) => {
    this.userService
      .findAllUserServ()
      .then((data) => {        
        return res.status(200).json(data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status          
        })));
      })
      .catch((error: unknown) => this.handleError(error, res));
  };

  findOneUser = (req: Request, res: Response) => {
    const { id } = req.params;

    if (id.length!=36) return res.status(422).json({ message: "Invalid user ID format." }); 

    this.userService
      .findOneUserServ(id)
      .then((data: any) => {
        console.log("first",data) 

        res.status(200).json({id: data.id,
          name: data.name,        
          email: data.email,        
          role:data.role,
          status:data.status});
      })
      .catch((error: unknown) => this.handleError(error, res));
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (id.length!=36) return res.status(422).json({ message: "Invalid user ID format." }); 

    const [error, updateUserDto] = UpdateUserDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.userService
      .updateUserServ(id, updateUserDto!)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error: unknown) => this.handleError(error, res));     
      
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    if (id.length!=36) return res.status(422).json({ message: "Invalid user ID format." }); 

    this.userService
      .deleteUserServ(id)
      .then((data:any) => {
        return res.status(200).json(data);
      })
      .catch((error: any) => this.handleError(error, res));
  };

   validUser = (req: Request, res: Response) => {
    return res.status(400).json({
      error: "Missing ID parameter. Please provide a user ID in the URL.",
      example: "/api/v1/users/:id"
    });
  };   

  noparamUser = (req: Request, res: Response) => {
    return res.status(400).json({
      message: "Do not need to provide a user Id parameter when creating a new user account."
    });    
  }

}
