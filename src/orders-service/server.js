const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "orders-service", status: "ok" });
});

app.get("/orders/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM belleza_conceptual.vw_pedidos_resumen WHERE id_pedido = $1",
      [Number(req.params.id)]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "No fue posible consultar el pedido" });
  }
});

app.get("/orders/:id/history", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT h.*
         FROM belleza_conceptual.vw_historial_pedido h
         JOIN belleza_conceptual.pedido p
           ON p.codigo_pedido = h.codigo_pedido
        WHERE p.id_pedido = $1
        ORDER BY h.fecha_cambio`,
      [Number(req.params.id)]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "No fue posible consultar el historial" });
  }
});

const port = Number(process.env.PORT || 3003);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`orders-service escuchando en puerto ${port}`);
  });
}

module.exports = app;
