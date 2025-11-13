import {DonationProvider} from "./donation.provider";
import {StripeService} from "./stripe.service";

export * from "./donation.provider";
export * from "./stripe.service";
export const Services = [DonationProvider, StripeService];