import { NextApiRequest, NextApiResponse } from 'next';
import { uploadFile } from './core';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            // Handle file upload
            uploadFile(req.body.files); 
            break;
        default:
            res.setHeader('Allow', ['POST', 'GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}