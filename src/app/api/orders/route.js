import { authOptions, isAdmin } from "@/app/api/auth/[...nextauth]/route";
import { Order } from "@/models/Order";
import { User } from "@/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URI);
    // route for 3 purposes to get all user order, admin orders and specific order

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    let admin = await isAdmin();

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    if (_id) {
        return Response.json(await Order.findById(_id));
    }


    if (admin) {
        return Response.json(await Order.find());
    }

    if (userEmail) {
        return Response.json(await Order.find({ userEmail }));
    }

}