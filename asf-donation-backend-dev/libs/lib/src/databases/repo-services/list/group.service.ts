import {Injectable, Logger} from "@nestjs/common";
import {DonationRepository, GroupRepository} from "../../repositories";
import {GroupEntity, IDonationEntity, IGroupEntity} from "@app/lib";

@Injectable()
export class GroupService {
    private readonly logger = new Logger(GroupEntity.name);

    constructor(private readonly groupRepository: GroupRepository) {
    }

    public async create(payload: IGroupEntity) {
        return await this.groupRepository.insert(payload);
    }

    public async getById(payload: { id: number }) {
        return await this.groupRepository.findOne({
            where: {
                id: payload.id
            }
        });
    }

    public async getAll() {
        return await this.groupRepository.find({
            order: {
                name: "ASC",
                id: "ASC"
            }
        });
    }

    public async countAll() {
        return await this.groupRepository.count();
    }
}
