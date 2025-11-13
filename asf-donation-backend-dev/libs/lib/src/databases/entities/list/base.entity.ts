import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    comment: "PrimaryKey",
  })
  id: number;

  @CreateDateColumn({
    comment: "timeStamp",
  })
  created_at?: number;

  @UpdateDateColumn({
    comment: "timeStamp",
  })
  updated_at?: number;

  @DeleteDateColumn({
    comment: "timeStamp",
  })
  deleted_at?: number;
}
