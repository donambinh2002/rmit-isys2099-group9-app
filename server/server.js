require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Not Protected apiRouter
const apiRouter = require("./apiRouter");

const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const inboundOrderRouter = require("./routes/inboundOrderRoutes");
const productCategoryRouter = require("./routes/productCategoryRoutes");
const warehouseRouter = require("./routes/warehouseRoutes");
const buyerOrderRouter = require("./routes/buyerOrderRoutes");

const app = express();
app.use(cookieParser());

// eslint-disable-next-line no-undef
const SERVER_PORT = process.env.SERVER_PORT;
const CORS_WHITELIST = [
  // eslint-disable-next-line no-undef
  `http://localhost:${process.env.SERVER_PORT}`,
  // eslint-disable-next-line no-undef
  `http://localhost:${process.env.CLIENT_MALL_PORT}`,
  // eslint-disable-next-line no-undef
  `http://localhost:${process.env.CLIENT_WHADMIN_PORT}`
];

app.use(bodyParser.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }),
);

apiRouter.use(cookieParser());

// Not Protected apiRouter
app.use("/api", apiRouter);

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/inbound-order", inboundOrderRouter);
app.use("/api/product-category", productCategoryRouter);
app.use("/api/warehouse", warehouseRouter);
app.use("/api/buyer-order", buyerOrderRouter);

app.get("/", (req, res) => {
  return res.json("Server is running");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on ${SERVER_PORT}`);
});

module.exports = app;
