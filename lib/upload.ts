'use server'
import { Storage } from '@google-cloud/storage';
import 'dotenv/config';
const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});
const bucketName = process.env.BUCKET_NAME || ''; 
const bucket = storage.bucket(bucketName);

export const upload = async (form: FormData) => {
    try {
        const file = form.get('file') as any
        if(!file) {
            throw new Error('No file found in form data')
        }
        if(file.size <1) {
            throw new Error('File is empty')
        }
        const buffer = Buffer.from(file.buffer);
        const storage = new Storage();
        await storage.bucket(bucketName).file(file.name).save(Buffer.from(buffer));
        const url = `https://storage.googleapis.com/${bucketName}/${file.name}`;
        return {url};
    } catch (error) {
        console.error(error);
    }

}