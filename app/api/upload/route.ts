
import { uploadFile } from './core';

export const POST = async (req: Request) => {
    // Handle file upload
    const form = await req.formData();
    const res = await uploadFile(form);
    return Response.json(
        { message: 'File uploaded successfully' ,
          data: res
        }
    );
};