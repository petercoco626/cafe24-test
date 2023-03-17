import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// import runMiddleware from '../../../lib/rundMiddleware';
// import cors from '@/lib/cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // await runMiddleware(req, res, cors);
  const { method } = req;

  // if (method !== 'GET') {
  //   res.status(400).json({ message: 'bad request.' });
  // }

  const code: string = req.query.code as string;
  const mallId: string = req.query.mallId as string;
  console.log(code);

  const params = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: 'https://cafe24-test.vercel.app/oauth',
  };

  const tokenResponse = await axios.post(
    `https://${mallId}.cafe24api.com/api/v2/oauth/token`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic R1dPNWNKTUtHSlRwa3psd29Zdk15QzpKdlZBeU5yc0FkMW1CSTNzeUMwVjlC`,
      },
    }
  );

  const accessToken = tokenResponse.data.access_token;

  // server에서 자체 key 가지고 jwt decoding 한 번 하고 보내주는게 좋을 듯.
  res.json({ accessToken });
};

export default handler;
