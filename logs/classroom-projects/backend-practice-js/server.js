import "dotenv/config";
import connectDB from "./src/common/config/db.config";
import app from "./src/app.js";

const PORT = process.env.PORT;
const start = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV}`);
    });
};

start().catch((error) => {
    console.error("Failed to start:", error);
    process.exit(1);
});
