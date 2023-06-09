import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuth() {
  const location = useRouter();

  const getAccessToken = async (code: string, mallId: string) => {
    // front에서 호출하면 cors 에러가 남. 근데 서버에서 호출하면 안남...?
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
    typeof window !== 'undefined' &&
      sessionStorage.setItem('accessToken', res.data.accessToken);
    typeof window !== 'undefined' && sessionStorage.setItem('mallId', mallId);

    location.push('/product');

    // if (res.status === 200) {
    //   const response = await axios.get(
    //     `/api/product?token=${res.data.accessToken}&mallId=${mallId}`
    //   );
    //   console.log(response);
    // }
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

  return (
    <div>
      <div></div>
    </div>
  );
}

export default OAuth;
