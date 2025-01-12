export class UpdateUserDTO {
  constructor(public readonly name: string, public readonly email: string) {}

  static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
    const { name, email } = object;

    if (!name) return ["The 'name' field is required."];
    if (name.length < 2) return ["Name must be at least 2 characters long"];
    if (typeof name !== "string") ["The name must be a string"];

    if (!email) return ["The 'email' field is required."];
    if (email.length < 5)
      return ["Email must be at least 5 characters long"];
     

    return [undefined, new UpdateUserDTO(name, email)];
  }
}
