import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "./base.entity";
import { IDonationEntity } from "../interface/donation.interface";

@Entity({ name: "donation" })
export class DonationEntity extends BaseEntity implements IDonationEntity {
    @Column({ type: "decimal", scale: 2, default: 0 })
    amount: number;

    @Column({ type: "int", nullable: false })
    user_id: number;

    @Column({ type: "varchar", nullable: false })
    user_email: string;

    @Column({type: "varchar", nullable: false})
    referral_name: string;

    @Column({ type: "int" })
    group_id: number;

    @Column({ type: 'varchar', nullable: true })
    event_id: string;

    @Column({ type: 'varchar' })
    token: string;
}
