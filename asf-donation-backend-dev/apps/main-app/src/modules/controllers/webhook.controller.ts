import {
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    Headers,
    Req,
    RawBodyRequest,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import Stripe from "stripe";
import configurations from "../../utils/config/configurations";
import { DonationService, UserService } from "@app/lib";
import { waitForDebugger } from "inspector";

@ApiTags('webhook')
@Controller("webhook")
export class DonationWebhookController {
    private readonly logger = new Logger(DonationWebhookController.name);
    private stripeInstance: Stripe;

    constructor(
        private readonly donationService: DonationService,
        private readonly userService: UserService,
    ) {
        this.stripeInstance = new Stripe(configurations.STRIPE_SECRET_KEY, {
            apiVersion: "2024-06-20"
        })
        this.logger.warn("Stripe instance initialized");
        this.logger.warn("Stripe webhook is ready");
    }

    @Post("stripe")
    @HttpCode(HttpStatus.OK)
    async webhook(
        @Headers('stripe-signature') signature: string,
        @Req() req: RawBodyRequest<Request>) {
        const payload = req.rawBody;
        const event = this.stripeInstance.webhooks.constructEvent(
            payload,
            signature,
            configurations.STRIPE_WEBHOOK_SECRET
        );

        console.log(event.type)
        if (event.type === 'checkout.session.completed') { };
        if (event.type === 'charge.succeeded') {
            console.log("stripe event", event.data.object)

            const email = event.data.object.receipt_email;
            const amount = event.data.object.amount;
            const event_id = event.id;

            console.warn("email", email);
            console.warn("amount", amount);

            const donation_record = await this.donationService.getByEmail(email)
            console.warn(donation_record, "dontion found")

            if (!donation_record) {
                console.error(`event: ${event.id}, donation record does not exist`)
            }

            await this.donationService.update({
                id: donation_record.id,
                user_email: email,
                event_id,
                amount
            })
        };
    }

}
