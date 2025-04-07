import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
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

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Fayl yuklashda xatolik' });

    const file: any = files.file;
    const fileName = path.basename(file[0].filepath);
    const fileUrl = `/uploads/${fileName}`;
    return res.status(200).json({ url: fileUrl });
  });
}
