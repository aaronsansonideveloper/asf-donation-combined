import {DataSource, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {DonationEntity} from "../../entities";

@Injectable()
export class DonationRepository extends Repository<DonationEntity> {
    constructor(private dataSource: DataSource) {
        super(DonationEntity, dataSource.createEntityManager());
    }
}
