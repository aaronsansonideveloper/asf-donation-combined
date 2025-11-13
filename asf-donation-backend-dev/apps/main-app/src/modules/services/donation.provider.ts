import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import configurations from "apps/main-app/src/utils/config/configurations";
import {DonationService, GroupService, UserService} from "@app/lib";
import {StripeService} from "./stripe.service";
import config from "apps/main-app/src/utils/config/configurations";
import { v4 as uuidv4 } from 'uuid';

// const crypto = require("bcrypt");
// const uuid = require("uuid");

export interface IDonationMaking {
    email: string;
    first_name: string;
    last_name: string;
    group_id: number;
}

@Injectable()
export class DonationProvider {
    private readonly logger = new Logger(DonationProvider.name);

    constructor(
        private readonly userService: UserService,
        private readonly donationService: DonationService,
        private readonly groupService: GroupService,
        private readonly stripeService: StripeService
    ) {
        this.logger.warn("DonationProvider initialized");
    }

    makeDonation = async (payload: IDonationMaking) => {
        const token = uuidv4();  
        // check if user exists
        const user = await this.userService.getByEmail(payload.email);
        if (!user) {
            const new_user = await this.userService.create({
                email: payload.email,
                first_name: payload.first_name,
                last_name: payload.last_name,
                group_id: payload.group_id
            });
            const stripe_customer = await this.stripeService.createCustomer(payload.email, payload.first_name);
            await this.userService.update({
                id: new_user.id,
                data: {
                    stripe_customer_id: stripe_customer.id
                }
            });

            console.log(stripe_customer.id)
            const url = await this.stripeService.createCheckoutSession({
                customer_id: stripe_customer.id,
                line_item: {price: config.PRICE_ID},
                user_id: new_user.id,
                group_id: payload.group_id,
                token: token
            });

            this.donationService.create({
                user_id:new_user.id,
                user_email: payload.email,
                group_id: payload.group_id,
                token:token,
                event_id:null
            })

            

            return url
        }

        // create donation checkout session
        console.log(user.stripe_customer_id)
        const url = await this.stripeService.createCheckoutSession({
            customer_id: user.stripe_customer_id,
            line_item: {price: config.PRICE_ID},
            user_id: user.id,
            group_id: payload.group_id,
            token:token
        });

        this.donationService.create({
            user_id:user.id,
            user_email: payload.email,
            group_id: payload.group_id,
            token:token,
            event_id:null
        })

        return url
    }
}
