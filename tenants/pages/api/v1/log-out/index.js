import { Logger } from "../../../../helpers";

const logger = new Logger('user_logged_out');
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Clear the HttpOnly cookie on the server-side to log the user out
    res.setHeader('Set-Cookie', 'accessToken=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');

    // Return a success response
    logger.info({
      log_message: `User logged out`,
      data: null
    })
    res.status(200).json({ message: 'Logout successful' });
  } else {

    // Return a 405 error if the request method is not POST
    logger.error({
      log_message: `User failed to log out`,
      data: 'Method Not Allowed'
    })

    res.status(405).json({ message: 'Method Not Allowed' });
  }
}