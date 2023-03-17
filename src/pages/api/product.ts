import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// import runMiddleware from '../../../lib/rundMiddleware';
// import cors from '@/lib/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // await runMiddleware(req, res, cors);
  const { method } = req;

  if (method !== 'GET') {
    res.status(400).json({ message: 'bad request.' });
  }

  const token: string = req.query.token as string;
  const mallId: string = req.query.mallId as string;

  const response = await axios.get(
    `https://${mallId}.cafe24api.com/api/v2/admin/products`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // server에서 자체 key 가지고 jwt decoding 한 번 하고 보내주는게 좋을 듯.
  res.json(response);
};

export default handler;
