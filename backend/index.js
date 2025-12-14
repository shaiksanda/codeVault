const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDb=require("./configDb")
dotenv.config();

connectMongoDb()


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const snippetRoutes = require("./routes/snippetRoutes");

app.use("/user", userRoutes);
app.use("/snippet", snippetRoutes);



app.get("/", (req, res) => {
    res.send("CodeVault API is running");
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
