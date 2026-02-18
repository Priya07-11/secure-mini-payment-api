require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

connectDB();

app.use(express.json());

app.use(authRoutes);
app.use(paymentRoutes);
app.use(transactionRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
