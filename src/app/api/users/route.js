import { User } from "@/models/User"
import mongoose from "mongoose"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URI)
    if(await isAdmin){
        const url = new URL(req.url)
        const id = url.search.split("=")[1]
        const users = await User.find(id ? { _id: id } : {})
        return Response.json(users)
    }else {
        return Response.json([])
    }
}