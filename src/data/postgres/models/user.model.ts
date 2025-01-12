
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserStatus {
  AVAILABLE = 'available',
  DISABLED = 'disabled',
}

export enum UserRol {
  CLIENT = 'client',
  EMPLOYEE = 'employee'
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 80,
    nullable: false,
  })
  name: string; 

  @Column("varchar", {
    length: 80,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column("varchar", {
    nullable: false,
  })
  password: string; 

  @Column("varchar", {
    length: 20,
    nullable: false,
    default: UserStatus.AVAILABLE,
  })
  status: UserStatus;

  @Column("varchar", {
    length: 20,
    nullable: false,  
    default: UserRol.CLIENT,  
  })
  role: UserRol;  

}
