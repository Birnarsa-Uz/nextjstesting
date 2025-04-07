import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import { NextApiResponse } from 'next';
import { IncomingMessage } from 'http';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: IncomingMessage, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const uploadDir = path.join(process.cwd(), '/public/uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
  });

  form.parse<string, string>(req, (err, fields: Fields, files: Files) => {
    if (err) return res.status(500).json({ error: 'Fayl yuklashda xatolik' });

    const file: formidable.File[] = files.file as formidable.File[];
    const fileName = path.basename(file[0].filepath);
    const fileUrl = `/uploads/${fileName}`;
    return res.status(200).json({ url: fileUrl });
  });
}
