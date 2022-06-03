const aws = require ('aws-sdk');
const {randomBytes} = require('crypto')

require("dotenv").config();

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

module.exports.generateUploadURL = async () => {
    const rawBytes = await randomBytes(16);
    const name = rawBytes.toString('hex');
    const params = ({
        Bucket:bucketName,
        Key:name,
        Expires:60
    })
    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    console.log(uploadURL)
    return uploadURL
}