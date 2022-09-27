import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleError = (error) => console.log("❌ DB Error", error);
const handleOpen = () => console.log("✅ DB Connected");

db.on("error", handleError);
db.once("open", handleOpen);
