const express = require("express");
const app = express();

const fs = require("fs"); //Enables us to interact with the servers fs performing crud ops to it.
const util = require("util"); //Kinda revolutionalizes fs methods to promises which become sweeter to handle.s
const unlinkFile = util.promisify(fs.unlink); //Nispy method for deleting files.

const multer = require("multer"); //Module that handles our uploads and is concerened about their storage affairs.

// Instead of using the complexities / flexibilities of storage prop, we just use the dest prop and boom done.

// FOR THE FILE TO BE READABLE WE HAVE TO CONFIGURE THE FOLLOWING TWO PARAMETERS
//===============================================================================
// Step 1 : Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `pictures/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});

// Step 2 : Applying the  Multer Filter
// Only allows pdf files to be uploaded

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "png") {
    cb(null, true);
  } else {
    cb(new Error("Not an image!!"), false);
  }
};

const rawBody = (req, res, next) => {
  console.log(
    "Always rememember that the req.file is created after multer action for human understanding!"
  );
  // console.log(req.file); //Returns an undefined value.
  // Observation
  // This file is non-existent  on the body. THe upload variable made to be a function by .single knows how to destructure this multipart/formData
  next();
};
// const { uploadFile, getFileStream } = require("./s3"); //Functions that deals with the s3. Concerns with storage our files to s3

// ALTERNATIVE A
// const upload = multer({ dest: "uploads/pictures/" }); //Storage has been directly defined on the upload line.

// ALTERNATIVE B
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

app.post("/documents", rawBody, upload.single("pdf"), async (req, res) => {
  // The file object is created purely by multer.Videos are also allowed mehn. How cool!
  console.log("Requested successfully received.");
  const { file } = req; //Created after multer does its thing.
  console.log(req.file); // These is the incomin file banda
  console.log;
  res.status(200);
});

app.listen(5000, () => console.log("listening on port 5000"));
