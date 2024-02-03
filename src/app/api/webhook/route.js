import { Order } from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
    const sig = req.headers.get('stripe-signature');
    let event;
    const signSecret = process.env.STRIPE_SIGN_SECRET
    const reqBuffer = await req.text()
    try {
        event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
    } catch (err) {
        console.log(err)
        return Response.json({ error: err.message }, { status: 400 });
    }
    const { data } = event
    console.log(event)
    if (event.type === 'checkout.session.completed') {
        const orderId = data?.object.metadata?.orderId
        const isPaid = data?.object.payment_status
        if (isPaid) {
            await Order.updateOne({ _id: orderId }, { paid: true })
        }
    }

    return Response.json('ok', { event }, { status: 200 });
}