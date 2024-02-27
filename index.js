require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
var todosRouter = require("./routes/to-do");
var usersRouter = require("./routes/user.router");
const app = express();

app.use(express.json());

app.use("/todo", todosRouter);
app.use("/user", usersRouter);
const { SwaggerUIBundle, SwaggerUIStandalonePreset } = require('swagger-ui-dist');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
