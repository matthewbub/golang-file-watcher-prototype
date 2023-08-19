import jwt from 'jsonwebtoken';

export function sspWithAuth(getServerSidePropsFunc) {
  return async (context) => {
    const token = context.req.cookies.accessToken;
    if (!token) {
      return {
        redirect: {
          destination: '/log-in',
          permanent: false,
        },
      };
    }

    const decoded = jwt.verify(token, process.env.SUPABASE_JWT);
    if (!decoded) {
      return {
        redirect: {
          destination: '/log-in',
          permanent: false,
        },
      };
    }

    // Call the original getServerSideProps function
    const originalProps = await getServerSidePropsFunc(context, decoded);

    return originalProps;
  };
}