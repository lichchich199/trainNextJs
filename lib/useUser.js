import { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router'

export default function useUser({ redirectTo = '', redirectFound = false} ) {
  const { data, mutate } = useSWR('/api/user');
  useEffect(() => {
    if(!redirectTo || !data) {
      return
    }
    if((redirectTo && !redirectFound && data?.isLoggedIn ) || (redirectFound && data?.isLoggedIn)){
      Router.push(redirectTo)
    }
  }, [data, redirectFound, redirectTo])

  return {data, mutate}
}