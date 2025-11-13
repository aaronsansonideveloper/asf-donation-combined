import {DonationController} from "./donation.controller";
import { DonationWebhookController } from "./webhook.controller";

export * from "./donation.controller";

export const Controllers = [DonationController, DonationWebhookController];