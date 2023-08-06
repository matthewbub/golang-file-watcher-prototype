// This should work with the App Router

import React from 'react';
import { supabase } from '../supabase.config';

/**
 * @deprecated
 */
export const withSession = (Component, authType) => {
  console.log('Step 1. withSession')

  function checkSession() {
    fetch('/api/v1/secure/hello')
      .then((res) => res.json())
      .then((data) => {
        console.log('Step 1.1 fetcher - success, also executes as Step 1.5 (sometimes)', data)

        if (data.message === 'Unauthorized') {
          window.location.href = '/log-in';
          return;
        }

        supabase
          .from('users')
          .select('auth_type')
          .eq('email', data.decodedToken.email)
          .single()
          .then((data) => {
            console.log('Step 1.6 supabase - success', data)

            if (data.data.auth_type !== authType) {
              // console.log('Step 1.7 supabase - auth_type mismatch', data)
              window.location.href = '/log-in';
            }

          })
      })
  }

  setInterval(checkSession, 1000 * 60); // 1 minute

  return function (props) {
    console.log('Step 1.2 return Component, executes twice simultaneously')

    return (
      <Component {...props} />
    )
  };
};
