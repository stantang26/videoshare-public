const express = require('express');
const video = require('./video');
const Video = require('./videoSchema');
const path = require('path');
const {generateUploadURL} = require('./s3url');
const app = express();
const aws = require ('aws-sdk');
const {randomBytes} = require('crypto')
const mongoose = require('mongoose');


require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Connected");
});
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/video', video);


app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/',(req,res)=>{
  console.log("hello");
});

app.get('/s3url', async (req,res)=>{

  const region = "ca-central-1", 
    bucketName = "st-videoshare",
    accessKeyId = process.env.AWS_ACCESS_KEY,
    secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})  

    const name = req.query.id;
    const params = ({
        Bucket:bucketName,
        Key:name,
        Expires:60
    })
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    console.log(uploadURL)
  res.send({uploadURL})
})

app.post('/upload', async (req,res)=>{
  const video = new Video({
    vidname: req.body.vidname,
    description: req.body.description
  })
try{
  let newVideo = await video.save();
  res.status(201).json(newVideo);
}catch(err){
    res.status(400).json({message: err.message});
}
})

app.get('/api', function(req,res){
  res.json({message: "hello"});
});

app.listen(process.env.PORT || 3001);
