import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import Stripe from "stripe";
import configurations from "../../utils/config/configurations";
import constants from "@app/lib/global-constant/constant"

export interface purchaseDemoItem {
    customer_id: string;
    group_id: number;
    user_id: number;
    referral_name: string;
    line_item: Stripe.Checkout.SessionCreateParams.LineItem;
    token: string;
}

@Injectable()
export class StripeService {
    private readonly logger = new Logger(StripeService.name);
    private stripeInstance: Stripe;

    constructor() {
        this.logger.warn("Stripe provider initialized");

        // init stripe instance
        this.stripeInstance = new Stripe(configurations.STRIPE_SECRET_KEY, {
            apiVersion: "2024-06-20",
        });
    }

    async createCustomer(email: string, first_name: string): Promise<Stripe.Customer> {
        try {
            const customer = await this.stripeInstance.customers.create({
                email,
                name: first_name,
            });

            return customer;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error);
        }
    }

    async createCheckoutSession(payload: purchaseDemoItem): Promise<Stripe.Checkout.Session> {
        try {
            const session = await this.stripeInstance.checkout.sessions.create({
                customer: payload.customer_id,
                invoice_creation: {
                    enabled: true,
                    invoice_data: {
                        metadata: {
                            order: "donation for aaron sansoni foundation",
                            token: payload.token
                        },
                    }
                },
                line_items: [
                    {
                        price: payload.line_item.price,
                        quantity: 1
                    }
                ],
                // this way of passing metadata is the only way to pass it along the process when using the checkout api
                payment_intent_data: {
                    metadata: {
                        group_id: payload.group_id.toString(),
                        user_id: payload.user_id.toString(),
                        referral_name: payload.referral_name
                    },
                },
                mode: "payment",
                tax_id_collection: {
                    enabled: true,
                },
                automatic_tax: {
                    enabled: true,
                },
                billing_address_collection: "required",
                payment_method_types: ["card"],
                customer_update: {
                    address: "auto",
                    name: "auto",
                },
                success_url: constants.urls.stripe_success_url,
                cancel_url: constants.urls.stripe_failure_url,
            });

            return session;
        } catch (error) {
            this.logger.error(error);
            throw new BadRequestException(error);
        }
    }
}
