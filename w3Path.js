require("dotenv").config();
// const { S3Client } = require("@aws-sdk/client-s3");
const aws = require("aws-sdk");
const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");

const app = express();
// s3 Package only seems to be useful for authenticaton.

// Even after update , the could not load credentials from any providers still persisted.
// aws.config.update({
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//   region: process.env.S3_BUCKET_REGION,
// });

// NEW VERSION FOR AUTHENTICATION
//================================
// Solved the error this.client.send is not a function
// const s3 = new S3Client({
//   region: process.env.S3_BUCKET_REGION,
//   accessKeyId: process.env.S3_ACCESS_KEY,
//   secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// });

// const s3 = new aws.S3();

// OLD VERSION FOR AUTHENTICATION
//================================
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const confirmReq = (req, res, next) => {
  console.log("Upload request successfully received.");
  next();
};

// Haha.... Hii thro pass ni hatari.... Storage is usually used to tell multer where the file being handled by multer will be stored.
// Which on this case we need it to be on amazon s3 bucket.

// CONFIGURING THE MIDDLEWARES
//==============================
// app.use(express.urlencoded()); //Parse URL-encoded bodies
// app.use(express.json()); //Used to parse JSON bodies
// app.use(cors());

const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `trial-${Date.now()}.pdf`);
  },
});
const upload = multer({
  storage,
});

// OUR GRACIOUS ROUTES.
app.post(
  "/upload",
  confirmReq,
  upload.single("photos"),
  function (req, res, next) {
    console.log(req.file);
    res.send({
      data: req.file,
      msg: "Successfully uploaded " + req.file + " files!",
    });
  }
);

app.post(
  "/multiple-upload",
  upload.array("photos", 4),
  function (req, res, next) {
    res.send({
      data: req.files,
      msg: "Successfully uploaded " + req.files + " files!",
    });
  }
);

app.listen(5000, () => console.log("listening on port 5000"));
