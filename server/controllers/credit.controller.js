import transaction from "../models/transcation.model.js";
import Stripe from "stripe";
const plans = [
    {
        _id: "basic",
        name: "Basic",
        price: "10",
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "pro",
        price: "20",
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "premium",
        price: "300",
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Standard support', 'Access to premium models', 'Dedicated account manager']
    }
]

//api controller for geting all plans
export const getAllplans = async (req, res) => {
    try {

        res.status(200).json({ success: true, plans })
    } catch (error) {
        console.log("Error in getting all plans", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

//api controller for purchasing plan

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const purchasePlan = async (req, res) => {
    try {
        const { planId } = req.body;
        const userId = req.id;
        // find plan by id form plans array
        const plan = plans.find(p => p._id === planId);
        //if not found return 404
        if (!plan) {
            return res.status(404).json({ success: false, message: "Plan not found" });
        }

        const newTransaction = new transaction({
            userId,
            planId: plan._id,
            amount: plan.price,
            credits: plan.credits,
            ispaid: false
        })
        newTransaction.save();
        //create stripe session  
        const { origin } = req.headers
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: plan.price * 100,
                        product_data: {
                            name: plan.name,
                        }
                    },
                    quantity: 1,
                },
            ],
            success_url: `${origin}/loading`,
            cancel_url: `${origin}`,
            mode: 'payment',
            metadata: {
                transactionId: newTransaction._id.toString(), appId: "quickgpt"
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes from now
        });
        // return response
        res.status(200).json({ success: true, plan, url: session.url });
    } catch (error) {
        console.log("Error in purchasing plan", error);
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}