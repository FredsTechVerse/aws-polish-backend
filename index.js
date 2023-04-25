// APP CONFIGURATION
const express = require("express");
const app = express();

const fs = require("fs"); //Enables us to interact with the servers fs performing crud ops to it.
const util = require("util"); //Kinda revolutionalizes fs methods to promises which become sweeter to handle.
const unlinkFile = util.promisify(fs.unlink); //Nispy method for deleting files.
//Modules that handle our uploads and are concerened about their storage affairs.
const multer = require("multer");
const multerS3 = require("multer-s3");

// ALTERNATIVE A
//==============
// Instead of using the complexities / flexibilities of storage prop, we just use the dest prop and boom done.
// const upload = multer({ dest: "uploads/" });

// ALTERNATIVE B
//================
// Step 1 : Configuring / Preparing our storage unit to our liking.
/*
const storage = multerS3({
  s3,
  bucket: process.env.S3_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `Skill-${Date.now()}.jpeg`);
  },
});

// Step 2 : Configuring multer to use our storage.
const upload = multer({
  storage: storage,
});

*/
// ALTERNATIVE C
//================
// Step 1 : Configuring / Preparing our storage unit to our liking.
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `pictures/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Step 2 : Adding a filter to our storage unit.
// For example, we can allow the user to upload only images.
// We can do that by filtering the files based on their MIME type.

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "png") {
    cb(null, true);
  } else {
    cb(new Error("Not an image!!"), false);
  }
};

// Step 3 : Configuring multer to use our storage and filter.
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

app.post("/documents", upload.single("pdf"), async (req, res) => {
  const { file } = req; //Created after multer does its thing.

  console.log(req.file); // These is the incoming file banda
  console.log;
  res.status(200);
});

app.listen(5000, () => console.log("listening on port 5000"));
