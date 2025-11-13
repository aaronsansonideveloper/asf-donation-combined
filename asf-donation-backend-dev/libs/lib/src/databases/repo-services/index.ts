import {UserService} from "./list/user.service";
import {GroupService} from "./list/group.service";
import {DonationService} from "./list/donation.service";

export const BUSINESS_SERVICES = [
    UserService,
    GroupService,
    DonationService
];

export * from "./list/user.service";
export * from "./list/group.service";
export * from "./list/donation.service";