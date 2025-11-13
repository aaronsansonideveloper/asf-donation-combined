import {Module} from "@nestjs/common";
import {Controllers} from "./controllers";
import {Services} from "./services";

@Module({
    imports: [],
    controllers: [...Controllers],
    providers: [...Services],
    exports: [...Services,],
})
export class InternalModule {}
