//apiRouter.js
const express = require("express");
const apiRouter = express.Router();

const { db } = require("./models");

{
  /* API Endpoint for all warehouses */
}
apiRouter.get("/warehouse", async (req, res) => {
  try {
    const [results] = await db.poolWHAdmin.query(`SELECT * FROM warehouse`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all products */
}
apiRouter.get("/product", async (req, res) => {
  try {
    const [results] = await db.poolWHAdmin.query(`SELECT * FROM product`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all lazada users */
}
apiRouter.get("/lazada_user", async (req, res) => {
  try {
    const [results] = await db.poolSeller.query(`SELECT * FROM lazada_user`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

{
  /* API Endpoint for all lazada users */
}
apiRouter.get("/wh_admin", async (req, res) => {
  try {
    const [results] = await db.poolWHAdmin.query(`SELECT * FROM wh_admin`);
    return res.json(results);
  } catch (error) {
    console.error("error: " + error.stack);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = apiRouter;
