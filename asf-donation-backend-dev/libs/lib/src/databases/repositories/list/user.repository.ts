import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UsersEntity } from "../../entities";

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }
}
