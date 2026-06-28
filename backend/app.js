const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const ownerRoutes = require("./routes/ownerRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use("/stores", storeRoutes);
app.use("/admin", adminRoutes);
app.use("/ratings", ratingRoutes);
app.use("/owner", ownerRoutes);

app.get("/", (req, res) => {
    res.send("Store Rating API is Running...");
});

module.exports = app;