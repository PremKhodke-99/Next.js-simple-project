import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function DELETE(req) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const getCurrentBlogID = searchParams.get("id");

        if (!getCurrentBlogID) {
            return NextResponse.json({
                success: false,
                message: "Blog ID is required"
            })
        }

        const deleteBlogById = await Blog.findByIdAndDelete(getCurrentBlogID);

        if (deleteBlogById) {
            return NextResponse.json({
                success: true,
                message: "Blog Deleted successfully"
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "Something went wrong! try again later."
            })
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong! try again later."
        })
    }
}