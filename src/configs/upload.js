const path = require("path");
const multer = require("multer");
const crypto = require("cripto");

const TMP_FOLDER = path.resolver(__diarname,"..","".."","tmp");
  const UPLOADS_FOLDER = path.resolver(__diarname,"uploads");

  const MULTER ={
    storage:multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback){
      const fileHash= crypto.randbytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;
      return callback(null, filename);
  }
  })
}

module.exports={
  TMP_FOLDER,
  UPLOADS_FOLDE,
  MULTER,

}
   