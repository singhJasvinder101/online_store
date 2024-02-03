import { MenuItem } from "@/models/MenuItem";
import mongoose, { mongo } from "mongoose"
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        mongoose.connect(process.env.MONGO_URI)
        if (await isAdmin()) {
            const data = await req.json()
            const menuItemDoc = await MenuItem.create(data)
            return Response.json({
                success: true,
                menuItemDoc
            })
        } else {
            return Response.json({
                success: false
            })
        }
    } catch (error) {
        return Response.json({
            success: false,
            error: error.errors || error.message
        })
    }
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URI)
    const menuItems = await MenuItem.find({})
    return Response.json({
        success: true,
        menuItems
    })
}

export async function PUT(req) {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const { _id, ...data } = await req.json()
        const item = await MenuItem.findByIdAndUpdate(_id, data)
        return Response.json({
            success: true
        });
    } catch (error) {
        return Response.json({
            success: false,
            error: error.errors || error.message
        })
    }
}

export async function DELETE(req) {
    try {
        mongoose.connect(process.env.MONGO_URI)
        const url = new URL(req.url)
        const _id = url.searchParams.get("_id")
        await MenuItem.findByIdAndDelete({ _id })
        return Response.json({
            success: true,
            message: "Menu item deleted successfully"
        })
    } catch (error) {
        return Response.json({
            success: false,
            error: error.errors || error.message
        })
    }
}
