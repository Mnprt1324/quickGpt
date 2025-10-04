import Stripe from "stripe";
import transaction from "../models/transcation.model.js";

export const handleStripeWebhook = async (req, res) => {
    try {
        console.log("enter")
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

        } catch (error) {
            return res.status(400).send(`Webhook Error: ${error.message}`);
        }
        //   Handle the event
        try {
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymetntIntent = event.data.object;
                    const section_list = await stripe.checkout.sessions.listLineItems(
                        {
                            paymetnt_intent: paymetntIntent.id,
                        }
                    )
                    console.log("section_list", section_list);
                    const session = section_list.data[0];
                    const { transactionId, appId } = session.metadata;
                    if (appId !== "quickgpt") {
                        return res.status(400).send(`Webhook Error: Invalid appId`);
                    }
                    const transactionDetails = await transaction.findById({ _id: transactionId, isPaid: false });
                    if (!transactionDetails) {
                        return res.status(404).json({ success: false, message: "Transaction not found" });
                    }
                    await User.findByIdAndUpdate(transactionDetails.userId, { $inc: { credits: transactionDetails.credits } });

                    transactionDetails.ispaid = true;
                    await transactionDetails.save();

                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);

            }
            res.status(200).json({ received: true });
        } catch (error) {
            console.log("Error in handling stripe webhook", error);
            res.status(500).json({ success: false, message: "Internal server error" })
        }

    } catch (error) {
        console.log("Error in handling stripe webhook", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
