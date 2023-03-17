import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuth() {
  const location = useRouter();

  const getAccessToken = async (code: string) => {
    const res = await axios.post(
      'https://dkliraer.cafe24api.com/api/v2/oauth/token',
      `grant_type=authorization_code&code=${code}&redirect_uri=https://cafe24-test.vercel.app/oauth`
    );

    if (res.status === 200) {
      console.log('HIHI');
    }
  };

  useEffect(() => {
    if (location.query.code) {
      // console.log(location.query.code);

      getAccessToken(location.query.code as string);
    }
  }, [location]);

  return <div>oauth...</div>;
}

export default OAuth;
