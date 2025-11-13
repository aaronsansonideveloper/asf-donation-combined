import 'dotenv/config'
import {myDataSource} from "./data-source"
import Stripe from 'stripe';
import * as process from "process";

enum EPaymentStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    CANCELLED = 'cancelled',
    PAST_DUE = 'past_due'
}

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_PK);
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const express = require('express');
const app = express();

// initialize data source
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// routes definition
app.get('/stripe', (request, response) => {
    response.send('Hello World');
})


app.post('/webhook/stripe', express.raw({type: 'application/json'}), async (request, response) => {
    let event = request.body;

    console.warn(event['type']);

    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err: any) {
            console.warn(`⚠️  Webhook signature verification failed.`, err.message);
        }
    }

    // declare variables
    let current_user = null;
    let current_user_subscription = null;
    let role_to_grant = null;

    // Handle the event
    switch (event.type) {
        case 'invoice.paid':
            console.log("进入了")
            const invoice = event.data.object as Stripe.Invoice;
            current_user = await myDataSource.getRepository("UsersEntity").findOne({where: {stripe_customer_id: invoice.customer}});

            const data = await myDataSource.getRepository("DonationEntity").findOne({where: {event_id: invoice.id}})
            if(data){
                break;
            }
            console.log(invoice.metadata)
            const donation = await myDataSource.getRepository("DonationEntity").find({where: { token: invoice.metadata.token}})
            console.log(invoice.amount_due/100)

            await myDataSource.getRepository("DonationEntity").update(donation,{
                amount:invoice.amount_due/100,
                event_id: invoice.id
            })

            break;


            const subscriptionDeleted = event.data.object as Stripe.Subscription;
            console.log(`Subscription for ${JSON.stringify(subscriptionDeleted.id)} deleted.`);

            // get current user
            current_user = await myDataSource.getRepository("UserEntity").findOne({where: {stripe_customer_id: subscriptionDeleted.customer}});
            if (!current_user) {
                console.error(`User with stripe customer id ${subscriptionDeleted.customer} not found.`)
            }

            // update subscription status
            await myDataSource.getRepository("SubscriptionEntity").update(
                {user_id: current_user.id},
                {
                    stripe_subscription_id: subscriptionDeleted.id,
                    stripe_price_id: subscriptionDeleted.items.data[0].price.id,
                    amount: subscriptionDeleted.items.data[0].price.unit_amount,
                    type: subscriptionDeleted.items.data[0].price.metadata.type,
                    interval: subscriptionDeleted.items.data[0].plan.interval,
                    status: EPaymentStatus.CANCELLED,
                });

    }
});

    const paymentPort = process.env.PAYMENT_APP_PORT
    app.listen(paymentPort, () => console.log('' +
        `Running on port ${paymentPort} \n'
    + 'Stripe Webhook: ${process.env.PAYMENT_APP_HOST}:${paymentPort}/webhook/stripe'
    + 'Waiting for Stripe Webhook events... \n`
    ));

    console.log("Server is running..., Webhook is waiting for Stripe webhook events...");
