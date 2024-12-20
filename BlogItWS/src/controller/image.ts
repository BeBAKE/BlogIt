import {Request, Response} from "express";

import sharp from "sharp"
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import {randomBytes} from 'node:crypto'
import { runQuery } from "../db";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

//@ts-ignore
const s3Client = new S3Client({
  region : region,
  credentials : {
    accessKeyId : accessKeyId,
    secretAccessKey : secretAccessKey
  }
})

//! POST image
export const postImage = async(req:Request,res:Response)=>{
  try {
    //? S3 part
    const imageName = randomBytes(32).toString('hex')
    const file = req.file
    const id = req.body.id
    const fileBuffer = await sharp(file?.buffer)
      .resize({height : 256,width : 320 , fit : "fill"}).toBuffer()

    const inputParams = {
      "Body": fileBuffer,
      "Bucket": bucketName,
      "Key": imageName,
      "ContentType" : file?.mimetype,
    };
    const command = new PutObjectCommand(inputParams)
    const response = await s3Client.send(command);

    //? database part
    const query = `Update "Blog" set image=$1 Where id=$2`;
    const values = [imageName,id]
    const queryRes = await runQuery(query,values)    
    return res.status(200).json({msg : "done"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg : "error"})
  }
}

//! GET image from S3
export const getImage = async(req:Request,res:Response)=>{
  try {    
    //? S3 part
    const { imageName } = req.params 
    const imageUrl = await getSignedUrl(
      s3Client,
      //@ts-ignore
      new GetObjectCommand({
        Bucket : bucketName,
        Key : imageName
      }),
      { expiresIn : 60*60*24 }
    )
    
    return res.status(200).json({success : true,msg : "done",data : imageUrl})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success : false,message : "Internal Server Error"})
  }
}

//! Delete image from S3
export const deleteImage = async(req:Request,res:Response)=>{
  try {
    const { imageName } = req.params
    const deleteParams = {
      Bucket: bucketName,
      Key: imageName,
    }
    const s3Reply = s3Client.send(new DeleteObjectCommand(deleteParams)) 
    return res.status(200).json({success : true,message : "Image deleted Successfully"})
  } catch (error) {
    console.log(error)
    return res.status(500).json({success : false,message : "Internal Server Error"})
  }
}
