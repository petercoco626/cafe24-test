import { useRouter } from 'next/router';
import { useEffect } from 'react';

function OAuth() {
  const location = useRouter();
  useEffect(() => {
    if (location.query.code) {
      console.log(location.query.code);
    }
  }, [location]);

  return <div>oauth...</div>;
}

export default OAuth;
