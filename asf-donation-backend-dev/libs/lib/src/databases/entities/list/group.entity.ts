import {Column, Entity, Index} from "typeorm";
import {BaseEntity} from "./base.entity";
import {IGroupEntity} from "@app/lib/databases/entities/interface/group.interface";

@Entity({name: "group"})
export class GroupEntity extends BaseEntity implements IGroupEntity {
    @Column({type: "varchar", length: 500})
    name: string;

    @Column({type: "varchar", length: 500, nullable: true})
    desc: string;
}
