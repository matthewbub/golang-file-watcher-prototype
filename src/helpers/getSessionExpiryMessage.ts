import dayjs from './dayjs';
import { get } from 'lodash';

interface DecodedToken {
  exp: number;
  [key: string]: any; // Other properties
}

export function getSessionExpiryMessage(decodedToken: DecodedToken): string | null {
  const exp = get(decodedToken, 'exp', 0); // Expiration time from the token
  const expires = dayjs(exp * 1000); // Convert to milliseconds
  const now = dayjs(); // Current time

  const differenceInMilliseconds = expires.diff(now);
  const differenceInMinutes = Math.floor(differenceInMilliseconds / 1000 / 60); // Convert to minutes

  if (differenceInMinutes > 5) {
    return null; // Return null if more than 5 minutes remain
  } else if (differenceInMinutes > 0) {
    return `Your session will expire in ${differenceInMinutes} minutes`;
  } else {
    return null;
  }
}