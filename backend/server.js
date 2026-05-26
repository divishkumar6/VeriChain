const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const {
  addEventListener,
  getEvents
} = require("./utils/activityEvents");

const certificateRoutes = require(
  "./routes/certificateRoutes"
);

dotenv.config();

const app = express();
const uploadsDir = path.join(__dirname, "uploads");
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

fs.mkdirSync(path.join(uploadsDir, "generated"), {
  recursive: true
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.use("/api/auth", authRoutes);

app.get("/api/events/history", (req, res) => {
  res.json(getEvents());
});

app.get("/api/events/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  res.write(`event: snapshot\n`);
  res.write(`data: ${JSON.stringify(getEvents())}\n\n`);

  const unsubscribe = addEventListener((event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  });

  req.on("close", unsubscribe);
});

app.use(
  "/api/certificate",
  certificateRoutes
);

app.get('/', (req, res) => {
  res.json({
    message: 'VeriChain API is running'
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected"
  });
});

async function ensureDemoAdmin() {
  const email =
    process.env.DEMO_ADMIN_EMAIL ||
    "admin@verichain.local";
  const password =
    process.env.DEMO_ADMIN_PASSWORD ||
    "admin123";

  const existingAdmin = await User.findOne({
    email
  });

  if (existingAdmin) {
    existingAdmin.name = existingAdmin.name || "VeriChain Admin";
    existingAdmin.password = await bcrypt.hash(
      password,
      10
    );
    existingAdmin.role = "admin";
    await existingAdmin.save();
    return;
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  await User.create({
    name: "VeriChain Admin",
    email,
    password: hashedPassword,
    role: "admin"
  });

  console.log(
    `Demo admin ready: ${email}`
  );
}

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");

  ensureDemoAdmin().catch((err) => {
    console.log(err);
  });

  const PORT = process.env.PORT || 5001;

  const server = app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Run npm run free-port, then npm run dev.`
      );
      process.exit(1);
    }

    throw error;
  });

})
.catch((err) => {
  console.log(err);
});
