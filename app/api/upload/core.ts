import { Storage } from '@google-cloud/storage';
import 'dotenv/config';
import {auth} from "@clerk/nextjs";
import fs from 'fs';

const MAX_FILE_COUNT = 1;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


const handleAuth = ()=>{
    const userId = auth();
    if(!userId) throw new Error("Not authenticated")
    return {userId:userId}
}

const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const bucketName = process.env.BUCKET_NAME || ''; 
const bucket = storage.bucket(bucketName);


// Upload a file
async function uploadFile(form : FormData) {
    const file =form.get('file') as File;
    if(!file) {
        console.error('Only one file can be uploaded at a time');
        return;
    }

    if(file.size > MAX_FILE_SIZE) {
        console.error('File size exceeds the limit');
        return;
    }

    try {
        const buffer = await file.arrayBuffer();
        const storage = new Storage();
        await storage.bucket(bucketName).file(file.name).save(Buffer.from(buffer)); 

        console.log(`${file.name} uploaded to ${bucketName}`);
    } catch (err) {
        console.error('ERROR:', err);
    }
    
    const url = `https://storage.cloud.google.com/${bucketName}/${file.name}`;
    return {url};
}
  
// Download a file
const file = bucket.file('file-name');
    file.download(function(err, contents) {
    if (!err) {
        console.log('File downloaded from Google Cloud Storage.');
    }
});

export { uploadFile, handleAuth ,file};