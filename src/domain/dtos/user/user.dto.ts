export class CreateUserDTO {
  constructor(public readonly name: string, public readonly email: string, public readonly password:string, public readonly role: string) {}

  static create(object: { [key: string]: any }): [string?, CreateUserDTO?] {
    const { name, email, password ,role} = object;

    if (!name) return ["The 'name' field is required.", undefined];
    if (name.length <= 2) return ["Name must be at least 2 characters long"];

    if (!email) return ["The 'email' field is required."];
    if (email.length <= 5)
      return ["Email must be at least 5 characters long."];

    if (!password) return ["The 'email' field is required."];
    if (password.length <= 3)
      return ["Password must be at least 3 characters long"];    

    if (!role) return ["The 'role' field is required."];
    if( role !== "client" && role !== "employee" ) return   ["Invalid role selected. Please choose 'Client' or 'Employee"];    
    
    return [undefined, new CreateUserDTO(name, email, password,role)];
  }
}
