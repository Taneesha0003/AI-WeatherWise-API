require("dotenv").config();

const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/weather", weatherRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/ai", aiRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("AI WeatherWise API is running!");
});

app.get("/test", (req, res) => {
    res.json({
        message: "WeatherWise API is working!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});