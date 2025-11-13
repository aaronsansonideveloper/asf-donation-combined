import { DataSource } from "typeorm"
import {
    DonationEntity,
    UsersEntity
} from "@app/lib";

// when NODE_ENV is not production, synchronize is true, otherwise false
const synchronize = process.env.NODE_ENV !== 'production' ? true : false;

export const myDataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DATABASE_MAIN_HOST,
    port: Number(process.env.DATABASE_MAIN_PORT),
    username: process.env.DATABASE_MAIN_USERNAME,
    password: process.env.DATABASE_MAIN_PASSWORD,
    database: process.env.DATABASE_MAIN_DATABASE,
    entities: [UsersEntity , DonationEntity],
    logging: false,
    synchronize: synchronize,
})
