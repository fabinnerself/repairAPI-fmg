
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn , ManyToOne, JoinColumn} from "typeorm";
import {User} from "./user.model"

export enum repairStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
  }

@Entity()
export class Repair extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ 
        type: 'date',         
        default: () => 'CURRENT_DATE',
        nullable: false,
     })
    date: Date;
  
    @Column({ 
        type: 'varchar', 
        length: 15,
        default: repairStatus.PENDING,
        nullable: false,
     })
    status: repairStatus;


    @Column({ type: "uuid", nullable: false })
    userId: string;
  
    @ManyToOne(() => User, (user) => user.id, { onDelete: "NO ACTION", onUpdate: "NO ACTION" })
    @JoinColumn({ name: "userId" })
    user: User;    
   
}
 