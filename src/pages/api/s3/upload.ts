import { NextApiRequest, NextApiResponse } from 'next';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-west-3',
  signatureVersion: 'v4',
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    console.log(
      `Method ${req.method} not allowed. Only POST requests are allowed.`,
    );
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    console.log('req.body', req.body);
    const { name, type } = req.body;
    const params = {
      Key: name,
      Bucket: process.env.AWS_BUCKET_NAME,
      ContentType: type,
      ACL: 'public-read',
    };

    const url = await s3.getSignedUrlPromise('putObject', params);

    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
