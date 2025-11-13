import {IBaseEntity} from "@app/lib/databases";

export interface IGroupEntity extends IBaseEntity {
    name: string;
    desc?: string;
}