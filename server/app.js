const connectDB = require("./config/db");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/usuario");
const CategoriaRouter = require("./routes/categoria");
const ProdutoRouter = require("./routes/produto");
const DepositoRouter = require("./routes/deposito");
const EnderecoRouter = require("./routes/endereco.js");
const MovimentoRouter = require("./routes/movimento.js");
const AuthRouter = require("./routes/auth");

connectDB();
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public"))); // Verificar a funcionalidade desse código.

app.use("/", indexRouter);
app.use("/usuario", usersRouter);
app.use("/categoria", CategoriaRouter);
app.use("/produto", ProdutoRouter);
app.use("/deposito", DepositoRouter);
app.use("/endereco", EnderecoRouter);
app.use("/movimento", MovimentoRouter);
app.use("/auth", AuthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
