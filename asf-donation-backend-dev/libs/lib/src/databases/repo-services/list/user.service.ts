import {Injectable, Logger} from "@nestjs/common";
import {UsersRepository} from "../../repositories";
import {IUserEntity} from "../../entities/interface/user.interface";

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly userRepo: UsersRepository) {
    }

    public async create(payload: Pick<IUserEntity, "email" | "first_name" | "last_name" | "group_id" | "stripe_customer_id" >) {
        return await this.userRepo.save(payload);
    }

    public async update(payload: { id: number, data: Partial<Omit<IUserEntity, "email">> }) {
        return await this.userRepo.update(payload.id, payload.data);
    }

    public async getById(id: number) {
        return await this.userRepo.findOne({
            where: {id}
        });
    }

    public async getByEmail(email: string) {
        return await this.userRepo.findOne({
            where: {email}
        });
    };

    public async getAll() {
        return await this.userRepo.find({
            order: {
                created_at: "DESC"
            },
        });
    }

}
