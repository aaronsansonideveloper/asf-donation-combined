import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
} from "@nestjs/common";
import {DonationProvider, IDonationMaking} from "../services/donation.provider";
import {ApiTags} from "@nestjs/swagger";
import {IGeneralResponse} from "@app/lib/global-constant/interfaces";

@ApiTags('donation')
@Controller("donation")
export class DonationController {
    private readonly logger = new Logger(DonationController.name);

    constructor(
        private readonly donationProvider: DonationProvider,
    ) {
        this.logger.warn("DonationController initialized");
    }

    @Post("create-session")
    @HttpCode(HttpStatus.OK)
    public async getDonation(@Body() payload: IDonationMaking) {
        console.log(payload)
        const url = await this.donationProvider.makeDonation(payload)
        console.log("url", url)
        return {
            data: {
                message: "donation session created",
                data: {...url}
            }
        }
    }

}
