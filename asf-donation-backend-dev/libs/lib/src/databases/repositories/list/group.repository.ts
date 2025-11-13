import {DataSource, Repository} from "typeorm";
import {Injectable} from "@nestjs/common";
import {GroupEntity} from "../../entities";

@Injectable()
export class GroupRepository extends Repository<GroupEntity> {
    constructor(private dataSource: DataSource) {
        super(GroupEntity, dataSource.createEntityManager());
    }
}
