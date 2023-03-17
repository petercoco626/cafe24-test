import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuth() {
  const location = useRouter();

  const getAccessToken = async (code: string, mallId: string) => {
    // const res = await axios.post(
    //   `https://${mallId}.cafe24api.com/api/v2/oauth/token`,
    //   `grant_type=authorization_code&code=${code}&redirect_uri=https://cafe24-test.vercel.app/oauth`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       Authorization:
    //         'Basic R1dPNWNKTUtHSlRwa3psd29Zdk15QzpKdlZBeU5yc0FkMW1CSTNzeUMwVjlC=',
    //     },
    //   }
    // );

    const res = await axios.post(`/api/auth?code=${code}&mallId=${mallId}`);

    if (res.status === 200) {
      console.log(res.data);

      const response = await axios.get(
        `https://${mallId}.cafe24api.com/api/v2/admin/products`,
        {
          headers: {
            Authorization: res.data.accessToken,
          },
        }
      );
      console.log(response);
    }
  };

  useEffect(() => {
    if (location.query.code) {
      console.log(location);

      getAccessToken(
        location.query.code as string,
        location.query.state as string
      );
    }
  }, [location]);

  return <div>oauth...</div>;
}

export default OAuth;
