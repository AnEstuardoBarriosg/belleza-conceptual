const express = require("express");
const pool = require("./db");

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "auth-service", status: "ok" });
});

app.get("/auth/roles", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_rol, nombre, descripcion, estado FROM belleza_conceptual.rol ORDER BY id_rol"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "No fue posible consultar los roles" });
  }
});

const port = Number(process.env.PORT || 3001);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`auth-service escuchando en puerto ${port}`);
  });
}

module.exports = app;
