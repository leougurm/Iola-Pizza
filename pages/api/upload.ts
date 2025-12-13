import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import { getUserFromRequest } from '../../lib/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = getUserFromRequest(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB
    filename: (name, ext, part) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      return `${uniqueSuffix}${ext}`;
    },
    filter: (part) => {
      return part.mimetype?.startsWith('image/') || false;
    },
  });

  try {
    const [fields, files] = await form.parse(req);

    const uploadedFiles = files.images || files.image || [];
    const fileArray = Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles];

    const urls = fileArray.map((file) => {
      const filename = path.basename(file.filepath);
      return `/uploads/${filename}`;
    });

    return res.status(200).json({ urls });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Failed to upload files' });
  }
}
