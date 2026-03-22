import "dotenv/config";
import app from "./src/app";
import connectDB from "./src/common/config/db";

const start = async () => {
    //connect to DB is always done with mongoose
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV}`);
    });
};

start().catch((err) => {
    console.error("Failed to start:", err);
    process.exit(1);
});
const PORT = process.env.PORT || 5000;

/**
 * 
    docker run -d \
    --name my-mongo \
    -p 27017:27017 \
    mongo:8.0

 */
