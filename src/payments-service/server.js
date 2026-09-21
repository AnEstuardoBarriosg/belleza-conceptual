const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "payments-service", status: "ok" });
});

app.get("/payments/:orderId", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_pago, id_pedido, metodo_pago, monto, referencia, estado_pago, fecha_pago
         FROM belleza_conceptual.pago
        WHERE id_pedido = $1`,
      [Number(req.params.orderId)]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "No fue posible consultar el pago" });
  }
});

const port = Number(process.env.PORT || 3004);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`payments-service escuchando en puerto ${port}`);
  });
}

module.exports = app;
