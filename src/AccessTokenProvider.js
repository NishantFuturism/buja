import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Constants from './containers/App/constants';

const AccessTokenContext = createContext();

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAccessToken = () => {
      // Check if the access token is already in the cookies
      const tokenFromCookies = Cookies.get('accessToken');
      if (tokenFromCookies) {
        setAccessToken(tokenFromCookies);
      } else {
        // Simulate API call to fetch the access token
        fetch(`${Constants.urls.baseUrl}${Constants.endPoints.token}`, {
          method: 'POST',
          headers: {
            accept: 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:
            'username=FCAPICL0100145&password=JHASGjnknkjhIhAjksnjansasasasMKLAHNSJHGASB02012121&grant_type=password',
        })
          .then((res) => res.json())
          .then(
            (result) => {
              setAccessToken(result.access_token);
              Cookies.set('accessToken', result.access_token);
            },
            (error) => {
              console.error('Error fetching access token:', error);
            }
          );
      }
    };

    fetchAccessToken();
  }, [router.asPath]);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
}

export function useAccessToken() {
  return useContext(AccessTokenContext);
}