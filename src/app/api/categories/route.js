import { Category } from "@/models/Category"

export async function POST(req) {
    try {
        const data = await req.json()
        const { name } = data
        const categoryDoc = await Category.create({ name })
        return Response.json({
            success: true,
            categoryCreated: categoryDoc
        })
    } catch (error) {
        return Response.json({
            success: false,
            error: error.errors
        })
    }
}

export async function GET() {
    return Response.json(await Category.find({}))
}

export async function PUT(req) {
    const data = await req.json()
    const { _id, name } = data
    await Category.updateOne({ _id }, { name })
    return Response.json({
        success: true,
        message: "Category updated successfully"
    })
}

export async function DELETE(req) {
    const { _id } = await req.json()
    await Category.findByIdAndDelete({ _id })
    return Response.json({
        success: true,
        message: "Category deleted successfully"
    })
}
