import { Injectable, Logger } from "@nestjs/common";
import { DonationRepository } from "../../repositories";
import { IDonationEntity } from "@app/lib";

@Injectable()
export class DonationService {
    private readonly logger = new Logger(DonationService.name);
    constructor(private readonly donationRepo: DonationRepository) { }

    public async create(payload: Pick<IDonationEntity, "user_id" | "group_id" | "token" | "event_id" | "user_email" | "referral_name">) {
        return await this.donationRepo.save(payload);
    }
    public async getByEmail(email: string) {
        return await this.donationRepo.findOne({
            where: {
                user_email: email
            }
        })
    }
    public async update(payload: {
        id: number,
        user_email: string,
        event_id: string,
        amount: number,
    }) {
        await this.donationRepo.update(payload.id, {
            user_email: payload.user_email,
            event_id: payload.event_id,
            amount: payload.amount / 100
        })
    }
    public async getById() { }
    public async getAll() { }
    public async countAll() { }
}
