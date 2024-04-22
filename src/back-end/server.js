const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const {GridFsStorage} = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const mongodb = require("mongodb");
const fs = require("fs");
const { Readable } = require('stream');

const app = require("./app");

// Load configuration file
dotenv.config({ path: "./config.env" });

// Obtain server connection details from configuration file
const database = process.env.DATABASE;
const port = process.env.PORT || 3000;


let bucket;
let upload;

async function initialization(){
    mongoose
        .connect(database)
        .then(() => {
            console.log("Connect to database successfully.");
        });

}





app.get("/test/find", (req, res) => {
    res.status(204).json({

    })
})


initialization().then(() => {
    const client = mongoose.connection.getClient();
    const db = client.db("lp-database");
    bucket = new mongodb.GridFSBucket(db, {
        bucketName : "myBucket"
    });
    upload = multer({ storage: multer.memoryStorage() });

    app.post("/test/upload", upload.single('file'), (req, res) => {
        const file = req.file;
        const readableStream = new Readable();
        readableStream.push(file.buffer);
        readableStream.push(null);


        const uploadStream = bucket.openUploadStream(file.originalname, {
            chunkSizeBytes: 1048576,
            metadata: { originalName: file.originalname }
        });

        readableStream.pipe(uploadStream)
            .on('finish', () => {
                console.log('File uploaded to GridFS');
                res.status(201).json({
                    status: 'success',
                    message: 'File uploaded successfully'
                });
            })
            .on('error', (err) => {
                console.error('Error uploading file:', err);
                res.status(500).json({
                    status: 'fail',
                    message: 'server is busy now, please try again later'
                });
            });


    });


    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
})

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
});

