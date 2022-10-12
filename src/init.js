import "dotenv/config";
import "./db.js";
import "./models/User.js";
import "./models/Post.js";
import app from "./server.js";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ Server Listening on port ${PORT} | http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
