import React from 'react';
import { supabase } from '../supabase.config';

export const withSession = (Component, authType) => {

  const fetcher = async () => {
    const response = await fetch('/api/v1/secure/hello');
    const data = await response.json();

    return data;
  }

  const authorizer = async () => {
    const data = await fetcher();
    const { data: user, error } = await supabase
      .from('users')
      .select('auth_type')
      .eq('email', data.decodedToken.email)
      .single()

    if (error || user.auth_type !== authType) {
      window.location.href = '/login';
      return false;
    }

    return true;
  }

  const authorized = authorizer() || false;

  if (!authorized) {
    return function (props) {
      return (
        <div>
          Loading...
        </div>
      )
    };
  }


  return function (props) {
    return (
      <Component {...props} />
    )
  };
};
