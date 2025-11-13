import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "./base.entity";
import { IUserEntity } from "../interface/user.interface";

@Index("user_email", ["email"], { unique: true })
@Entity({ name: "users" })
export class UsersEntity extends BaseEntity implements IUserEntity {
  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 128,
    nullable: true,
  })
  first_name: string;

  @Column({
    type: "varchar",
    length: 128,
    nullable: true,
  })
  last_name: string;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  mobile?: string;


  @Column({
    type: "int",
    nullable: false
  })
  group_id: number;

  // 3rd party platform user fields
  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  stripe_customer_id?: string;

  @Column({
    type: "varchar",
    length: 500,
    nullable: true,
  })
  stripe_session_id?: string;
}
