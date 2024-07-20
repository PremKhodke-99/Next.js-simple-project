'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Fragment } from "react"

function AddNewBlog({
    openBlogDialog,
    setOpenBlogDialog,
    loading,
    blogFormData,
    setBlogFormData,
    handleSaveBlogData,
    currentEditedBlogId,
    setCurrentEditedBlogId
}) {


    return (
        <Fragment>
            <div>
                <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
            </div>

            <Dialog open={openBlogDialog} onOpenChange={() => {
                setOpenBlogDialog(false);
                setBlogFormData({
                    title: '',
                    description: '',
                });
                setCurrentEditedBlogId(null);
            }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{currentEditedBlogId ? 'Edit Blog' : 'Add New Blog'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                name="title"
                                placeholder="Enter Blog Title"
                                value={blogFormData.title}
                                onChange={(e) => setBlogFormData({
                                    ...blogFormData,
                                    title: e.target.value
                                })}
                                id="title"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                name="description"
                                value={blogFormData.description}
                                onChange={(e) => setBlogFormData({
                                    ...blogFormData,
                                    description: e.target.value
                                })}
                                id="description"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSaveBlogData}>
                            {
                                loading ? 'Saving' : 'Save'
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default AddNewBlog