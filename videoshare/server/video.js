const express = require('express');
const router = express.Router();
const Video = require('./videoSchema');
const mongoose = require('mongoose');
const aws = require('aws-sdk');

require("dotenv").config();

router.get(`/:id`, async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    const vid = "https://st-videoshare.s3.ca-central-1.amazonaws.com/" +id.toString()
    try{
        const videoData = await Video.findById(id)
       res.send({vid: vid, videoData : videoData});
    }catch(err){
        res.status(500).json({message: err.message});
    }
  });

router.delete(`/:id`, async (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
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
const params = ({
    Bucket:bucketName,
    Key:id.toString()
})
    console.log(id)
    try{
        const videoData = await Video.findById(id)
        if(videoData){
            await Video.deleteOne({_id:id});
            s3.deleteObject(params, (err,data) => {
                if (err){
                    console.log(err);
                }else {
                    console.log(data)
                }
            })
           res.send(id);
        }else{
            res.send(404).json({message:"Video not found"})
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
  });

  router.get('/',async (req,res) => {
    try{
        const videos = await Video.find();
        res.send(videos);
    }catch(err){
        res.status(500).json({message: err.message});
    }
})

module.exports = router;