const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // define o destino usando o path
    cb(null, path.resolve(__dirname, "..", "..", "uploads")); // pasta onde será salvo o arquivo
  },
  filename: function (req, file, cb) {
    // cria um critério unico para renomer o arquivo
    const time = new Date().getTime();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${time}${ext}`);
  },
});
const upload = multer({ storage: storage });

module.exports = { upload };
