import { IBaseEntity } from "@app/lib";

export interface IDonationEntity extends IBaseEntity {
    amount: number;
    user_id: number;
    user_email: string;
    group_id: number;
    token: string;
    event_id: string
}
