import mongoose from "mongoose";

const connectToDB = async () => {
    const connectionUrl = "mongodb://localhost:27017/nextBlog";

    mongoose
        .connect(connectionUrl)
        .then(() => console.log('DB connection success'))
        .catch((error) => console.error(error))
};

export default connectToDB;