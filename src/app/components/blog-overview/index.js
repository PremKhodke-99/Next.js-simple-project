'use client'

import { useEffect, useState } from "react"
import AddNewBlog from "../add-new-blog"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

const initialBlogFormdata = {
    title: '',
    description: '',
};

const BlogOverview = ({ blogList }) => {

    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [blogFormData, setBlogFormData] = useState(initialBlogFormdata);
    const [currentEditedBlogId, setCurrentEditedBlogId] = useState(null);

    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [])

    async function handleSaveBlogData() {
        try {
            setLoading(true)
            const apiResponse = currentEditedBlogId !== null ?
                await fetch(`/api/update-blog?id=${currentEditedBlogId}`, {
                    method: 'PUT',
                    body: JSON.stringify(blogFormData),
                })
                : await fetch('/api/add-blog', {
                    method: 'POST',
                    body: JSON.stringify(blogFormData),
                });
            const result = await apiResponse.json();

            if (result?.success) {
                setBlogFormData(initialBlogFormdata);
                setOpenBlogDialog(false);
                setCurrentEditedBlogId(null);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            setBlogFormData(initialBlogFormdata);
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteBlogById(id) {
        try {
            const apiResponse = await fetch(`/api/delete-blog?id=${id}`, {
                method: 'DELETE'
            });
            const result = await apiResponse.json();

            if (result?.success) {
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function handleEdit(blog) {
        setCurrentEditedBlogId(blog._id);
        setBlogFormData({
            title: blog?.title,
            description: blog?.description
        })
        setOpenBlogDialog(true);

    }

    return (
        <div className="min-h-screen p-8 flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600">
            <AddNewBlog
                openBlogDialog={openBlogDialog}
                setOpenBlogDialog={setOpenBlogDialog}
                loading={loading}
                setLoading={setLoading}
                blogFormData={blogFormData}
                setBlogFormData={setBlogFormData}
                handleSaveBlogData={handleSaveBlogData}
                currentEditedBlogId={currentEditedBlogId}
                setCurrentEditedBlogId={setCurrentEditedBlogId}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                {
                    blogList?.length > 0 ?
                        blogList.map((item) =>
                            <Card className='p-5'>
                                <CardContent>
                                    <CardTitle className='mb-5'>{item?.title}</CardTitle>
                                    <CardDescription>{item?.description}</CardDescription>
                                    <div className="mt-5 flex gap-5  items-center">
                                        <Button onClick={() => handleEdit(item)}>Edit</Button>
                                        <Button onClick={() => handleDeleteBlogById(item._id)}>Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                        : <Label className="text-4xl font-extrabold">No Blog Found! Please add one</Label>
                }
            </div>
        </div>
    )
}

export default BlogOverview