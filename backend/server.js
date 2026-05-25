const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require("./routes/authRoutes");

const certificateRoutes = require(
  "./routes/certificateRoutes"
);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(
  "/api/certificate",
  certificateRoutes
);

app.get('/', (req, res) => {
  res.json({
    message: 'CODE-A-THON API is running'
  });
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log("MongoDB Connected");

  const PORT = process.env.PORT || 5001;

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });

})
.catch((err) => {
  console.log(err);
});