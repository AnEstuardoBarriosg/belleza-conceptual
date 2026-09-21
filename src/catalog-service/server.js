const express = require("express");
const pool = require("./db");
const { createClient } = require("redis");

const app = express();
app.use(express.json());

let redisClient;

async function getRedis() {
  if (!redisClient) {
    redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`
    });
    redisClient.on("error", () => {});
    await redisClient.connect();
  }
  return redisClient;
}

app.get("/health", (req, res) => {
  res.json({ service: "catalog-service", status: "ok" });
});

app.get("/products", async (req, res) => {
  try {
    const redis = await getRedis();
    const key = "catalog:products";
    const cached = await redis.get(key);

    if (cached) {
      return res.json(JSON.parse(cached));
    }

    const result = await pool.query(
      "SELECT * FROM belleza_conceptual.vw_catalogo_productos ORDER BY producto"
    );

    await redis.setEx(key, 60, JSON.stringify(result.rows));
    res.json(result.rows);
  } catch (error) {
    try {
      const result = await pool.query(
        "SELECT * FROM belleza_conceptual.vw_catalogo_productos ORDER BY producto"
      );
      res.json(result.rows);
    } catch {
      res.status(500).json({ error: "No fue posible consultar el catálogo" });
    }
  }
});

app.get("/products/:id/stock", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT belleza_conceptual.fn_stock_disponible($1) AS stock",
      [Number(req.params.id)]
    );
    res.json({ id_producto: Number(req.params.id), stock: result.rows[0].stock });
  } catch (error) {
    res.status(500).json({ error: "No fue posible consultar el inventario" });
  }
});

const port = Number(process.env.PORT || 3002);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`catalog-service escuchando en puerto ${port}`);
  });
}

module.exports = app;
